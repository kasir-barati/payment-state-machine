// @ts-check
const paymentStates = require("./payment-states.json");

const createMachine = require("./create-machine");

const machine = createMachine({
  initialState: paymentStates.authorized,
  [paymentStates.authorized]: {
    actions: {
      onEnter() {
        console.log(`${paymentStates.authorized}: onEnter`);
      },
      onExit() {
        console.log(`${paymentStates.authorized}: onExit`);
      },
    },
    transitions: {
      settle: {
        target: paymentStates.settled,
        action() {
          console.log(
            `transition action for "settle" in "${paymentStates.authorized}" state`,
          );
        },
      },
    },
  },
  [paymentStates.settled]: {
    actions: {
      onEnter() {
        console.log(`${paymentStates.settled}: onEnter`);
      },
      onExit() {
        console.log(`${paymentStates.settled}: onExit`);
      },
    },
    transitions: {
      done: {
        target: paymentStates.successful,
        action() {
          console.log(
            `transition action for "done" in "${paymentStates.settled}" state`,
          );
        },
      },
      fail: {
        target: paymentStates.failed,
        action() {
          console.log(
            `transition action for "fail" in "${paymentStates.settled}" state`,
          );
        },
      },
      cancel: {
        target: paymentStates.canceled,
        action() {
          console.log(
            `transition action for "cancel" in "${paymentStates.settled}" state`,
          );
        },
      },
    },
  },
  [paymentStates.successful]: {
    actions: {
      onEnter() {
        console.log(`${paymentStates.successful}: onEnter`);
      },
      onExit() {
        console.log(`${paymentStates.successful}: onExit`);
      },
    },
    transitions: {
      adminApproval: {
        target: paymentStates.approved,
        action() {
          console.log(
            `transition action for "adminApproval" in ${paymentStates.successful} state`,
          );
        },
      },
      adminRefund: {
        target: paymentStates.refunded,
        action() {
          console.log(
            `transition action for "adminRefund" in ${paymentStates.successful} state`,
          );
        },
      },
      userCancel: {
        target: paymentStates.refunded,
        action() {
          console.log(
            `transition action for "adminRefund" in ${paymentStates.successful} state`,
          );
        },
      },
      adminCancel: {
        target: paymentStates.canceled,
        action() {
          console.log(
            `transition action for "adminRefund" in ${paymentStates.successful} state`,
          );
        },
      },
    },
  },
  [paymentStates.approved]: {
    actions: {
      onEnter() {
        console.log(`${paymentStates.approved}: onEnter`);
      },
      onExit() {
        console.log(`${paymentStates.approved}: onExit`);
      },
    },
    transitions: {
      adminRefund: {
        target: paymentStates.refunded,
        action() {
          console.log(
            `transition action for "adminRefund" in "${paymentStates.approved}" state`,
          );
        },
      },
      adminCancel: {
        target: paymentStates.canceled,
        action() {
          console.log(
            `transition action for "adminCancel" in "${paymentStates.approved}" state`,
          );
        },
      },
    },
  },
  [paymentStates.refunded]: {
    actions: {
      onEnter() {
        console.log(`${paymentStates.refunded}: onEnter`);
      },
      onExit() {
        console.log(`${paymentStates.refunded}: onExit`);
      },
    },
  },
  [paymentStates.failed]: {
    actions: {
      onEnter() {
        console.log(`${paymentStates.approved}: onEnter`);
      },
      onExit() {
        console.log(`${paymentStates.approved}: onExit`);
      },
    },
  },
  [paymentStates.canceled]: {
    actions: {
      onEnter() {
        console.log(`${paymentStates.approved}: onEnter`);
      },
      onExit() {
        console.log(`${paymentStates.approved}: onExit`);
      },
    },
  },
});

let state = machine.value;
console.log(`current state: ${state}`);
state = machine.transition(state, "settle");
console.log(`current state: ${state}`);
state = machine.transition(state, "fail");
console.log(`current state: ${state}`);
