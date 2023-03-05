import { createMachine, assign } from 'xstate';
import { fetchCountries } from "../Utils/Api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: () => fetchCountries,
        onDone: {
          target: 'success',
          actions: assign({
            countries: (context, event) => event.data,
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Fallo el request',
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};
const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "initial",
  context: {
    passengers: [],
    selectedCountry: '',
    countries: [],
    error: '',
  },
  states: {
    initial: {
      on: {
        START: {
          target: "search",
        },
      },
    },
    search: {
      on: {
        CONTINUE: {
          target: 'passengers',
          actions: assign({
            selectedCountry: (context, event) => event.selectedCountry
          })
        },
        CANCEL: "initial",
      },
      ...fillCountries,
    },
    tickets: {
        after: {
            10000: {
                target: "initial",
                actions: "cleanContext",
            }
        },
      on: {
        FINISH: {
            target: "initial",
            actions: "cleanContext",
        },
      },
    },
    passengers: {
      on: {
        DONE: {
            target: "tickets",
            cond: "moreThanOnePassenger"
        },
        CANCEL: {
            target: "initial",
            actions: "cleanContext",
        },
        ADD: {
          target: 'passengers',
          actions: assign(
            (context, event) => context.passengers.push(event.newPassenger)
          )
        }
      },
    },
  },
},
{
  actions: {
    cleanContext: assign({
        passengers: [],
        selectedCountry: "",
       
    }),
  },
  guards: {
    moreThanOnePassenger: (context) => {
      return context.passengers.length > 0;
    }
  },
});

export default bookingMachine;