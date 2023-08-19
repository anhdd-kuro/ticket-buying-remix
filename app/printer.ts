const url = 'http://192.168.11.11/StarWebPRNT/SendMessage'

export function print() {
  const canvas = document.getElementById('receipt-canvas') as HTMLCanvasElement

  if (canvas?.getContext) {
    alert('canvas.getContext:' + url)
    const context = canvas.getContext('2d')

    // @ts-ignore
    const trader = new StarWebPrintTrader({ url: url })

    trader.onReceive = function (response) {
      alert('Received response')

      let msg = '- onReceive -\n\n'

      msg += 'TraderSuccess : [ ' + response.traderSuccess + ' ]\n'
      msg += 'TraderStatus : [ ' + response.traderStatus + ',\n'

      if (trader.isCoverOpen({ traderStatus: response.traderStatus })) {
        msg += '\tCoverOpen,\n'
      }
      if (trader.isOffLine({ traderStatus: response.traderStatus })) {
        msg += '\tOffLine,\n'
      }
      if (
        trader.isCompulsionSwitchClose({ traderStatus: response.traderStatus })
      ) {
        msg += '\tCompulsionSwitchClose,\n'
      }
      if (trader.isEtbCommandExecute({ traderStatus: response.traderStatus })) {
        msg += '\tEtbCommandExecute,\n'
      }
      if (
        trader.isHighTemperatureStop({ traderStatus: response.traderStatus })
      ) {
        msg += '\tHighTemperatureStop,\n'
      }
      if (
        trader.isNonRecoverableError({ traderStatus: response.traderStatus })
      ) {
        msg += '\tNonRecoverableError,\n'
      }
      if (trader.isAutoCutterError({ traderStatus: response.traderStatus })) {
        msg += '\tAutoCutterError,\n'
      }
      if (trader.isBlackMarkError({ traderStatus: response.traderStatus })) {
        msg += '\tBlackMarkError,\n'
      }
      if (trader.isPaperEnd({ traderStatus: response.traderStatus })) {
        msg += '\tPaperEnd,\n'
      }
      if (trader.isPaperNearEnd({ traderStatus: response.traderStatus })) {
        msg += '\tPaperNearEnd,\n'
      }
      if (trader.isRollPositionError({ traderStatus: response.traderStatus })) {
        msg += '\tRollPositionError,\n'
      }

      msg +=
        '\tEtbCounter = ' +
        trader
          .extractionEtbCounter({ traderStatus: response.traderStatus })
          .toString() +
        ' ]\n'

      alert(msg)
    }

    trader.onError = function (response) {
      let msg = '- onError -\n\n'
      msg += '\tStatus:' + response.status + '\n'
      msg += '\tResponseText:' + response.responseText

      alert(msg)
    }

    try {
      // @ts-ignore
      const builder = new StarWebPrintBuilder()

      let request = ''

      request += builder.createInitializationElement()

      alert(canvas.width + 'x' + canvas.height)

      request += builder.createBitImageElement({
        context: context,
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
      })

      request += builder.createCutPaperElement({ feed: true })

      trader.sendMessage({ request: request })
    } catch (e) {
      if (e instanceof TypeError) alert(e.message)
    }
  }
}
