const url = "http://172.16.30.47:8001/StarWebPRNT/SendMessage"
// const url = "http://localhost:8001/StarWebPRNT/SendMessage"

function print() {

  const canvas = document.getElementById('receipt-canvas')

  if (canvas.getContext) {
    showNowPrinting();
    alert('canvas.getContext:' + url)
    const context = canvas.getContext('2d');

    const trader = new StarWebPrintTrader({ url: url });

    trader.onReceive = function (response) {
      hideNowPrinting();
      alert('Received response')

      let msg = '- onReceive -\n\n';

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

      alert(msg);
    }

    trader.onError = function (response) {
      hideNowPrinting();

      var msg = '- onError -\n\n';
      msg += '\tStatus:' + response.status + '\n';
      msg += '\tResponseText:' + response.responseText;

      alert(msg);
    }

    try {
      const builder = new StarWebPrintBuilder();

      let request = '';

      request += builder.createInitializationElement();

      request += builder.createBitImageElement({ context: context, x: 0, y: 0, width: canvas.width, height: canvas.height });

      request += builder.createCutPaperElement({ feed: true });

      trader.sendMessage({ request: request });
    }
    catch (e) {
      alert(e.message);
    }
  }

}

function showNowPrinting() {
  // document.getElementById('overlay').style.display = "block";
  // document.getElementById('nowPrintingWrapper').style.display = "table";
}

function hideNowPrinting() {
  // document.getElementById('overlay').style.opacity = 0.0;
  // document.getElementById('overlay').style.transition = "all 0.3s";
  // intimer = setTimeout(function () {
  //   document.getElementById('overlay').style.display = "none";
  //   document.getElementById('overlay').style.opacity = 1;
  //   clearTimeout(intimer);
  // }, 300);
  // document.getElementById('nowPrintingWrapper').style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
  const printBtn = document.getElementById('print-button');
  printBtn.addEventListener('click', print);
});
