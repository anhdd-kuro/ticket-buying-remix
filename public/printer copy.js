const url = "http://localhost:8001/StarWebPRNT/SendMessage";
// const url = "http://192.168.11.11/StarWebPRNT/SendMessage";

if (typeof StarWebPrintTrader === 'undefined' || typeof StarWebPrintBuilder === 'undefined') {
  alert('StarWebPrintTrader not loaded');
  return;
}

function print() {
  alert('print function');
  const canvases = document.querySelectorAll('[data-selector=ticket-canvas]');

  if (canvases.length === 0) {
    alert('No canvases found');
    return;
  }

  const trader = new StarWebPrintTrader({ url: url });

  let resolvePromise;

  trader.onReceive = function (response) {
    alert('Received response');

    let msg = '- onReceive -\n\n';

    // ... rest of the code

    msg += 'TraderSuccess : [ ' + response.traderSuccess + ' ]\n';
    msg += 'TraderStatus : [ ' + response.traderStatus + ',\n';

    if (trader.isCoverOpen({ traderStatus: response.traderStatus })) { msg += '\tCoverOpen,\n'; }
    if (trader.isOffLine({ traderStatus: response.traderStatus })) { msg += '\tOffLine,\n'; }
    if (trader.isCompulsionSwitchClose({ traderStatus: response.traderStatus })) { msg += '\tCompulsionSwitchClose,\n'; }
    if (trader.isEtbCommandExecute({ traderStatus: response.traderStatus })) { msg += '\tEtbCommandExecute,\n'; }
    if (trader.isHighTemperatureStop({ traderStatus: response.traderStatus })) { msg += '\tHighTemperatureStop,\n'; }
    if (trader.isNonRecoverableError({ traderStatus: response.traderStatus })) { msg += '\tNonRecoverableError,\n'; }
    if (trader.isAutoCutterError({ traderStatus: response.traderStatus })) { msg += '\tAutoCutterError,\n'; }
    if (trader.isBlackMarkError({ traderStatus: response.traderStatus })) { msg += '\tBlackMarkError,\n'; }
    if (trader.isPaperEnd({ traderStatus: response.traderStatus })) { msg += '\tPaperEnd,\n'; }
    if (trader.isPaperNearEnd({ traderStatus: response.traderStatus })) { msg += '\tPaperNearEnd,\n'; }
    if (trader.isRollPositionError({ traderStatus: response.traderStatus })) { msg += '\tRollPositionError,\n'; }

    msg += '\tEtbCounter = ' + trader.extractionEtbCounter({ traderStatus: response.traderStatus }).toString() + ' ]\n';

    console.log(msg);

    resolvePromise();
  };

  trader.onError = function (response) {
    var msg = '- onError -\n\n';
    msg += '\tStatus:' + response.status + '\n';
    msg += '\tResponseText:' + response.responseText;

    resolvePromise();

    console.log(msg);
  };

  const promiseArray = [];

  for (const canvas of canvases) {
    if (canvas.getContext) {
      const builder = new StarWebPrintBuilder();
      const context = canvas.getContext('2d');

      let request = '';

      request += builder.createInitializationElement();

      console.log(canvas.width + 'x' + canvas.height);

      request += builder.createBitImageElement({ context: context, x: 0, y: 0, width: canvas.width, height: canvas.height });

      request += builder.createCutPaperElement({ feed: true });

      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
        trader.sendMessage({ request: request });
      });

      promiseArray.push(promise);
    }
  }

  Promise.all(promiseArray)
    .then(() => {
      console.log('All promises resolved.');
    })
    .catch((e) => {
      console.log(e.message);
    });
}

window.addEventListener('load', function () {
  const printBtn = document.getElementById('print-button');
  alert('printBtn loaded' + printBtn);
  printBtn.addEventListener('click', (e) => {
    e.preventDefault()
    alert('printBtn clicked')
    print('ticket-canvas')
  });
});
