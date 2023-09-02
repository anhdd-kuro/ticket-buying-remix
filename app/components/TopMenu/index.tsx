import { Link } from '@remix-run/react'
import { Modal } from '@shopify/polaris'
import QrScanner from 'qr-scanner'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export const TopMenu = ({ prefix = '' }: { prefix?: string }) => {
  const videoElmRef = useRef<HTMLVideoElement>(null)
  const qrScanner = useRef<QrScanner>()

  const [scanResult, setScanResult] = useState('')
  const [open, setOpen] = useState(false)
  const [scanStatus, setScanStatus] = useState<'' | 'loading' | 'scanning'>('')

  useEffect(() => {
    if (!open || !scanStatus) return
    console.log('videoElmRef', videoElmRef.current)
    console.log('qrScanner', qrScanner.current)

    if (videoElmRef.current && scanStatus === 'loading') {
      console.log('qrScanner init')
      qrScanner.current = new QrScanner(
        videoElmRef.current,
        (result) => {
          console.log('decoded qr code:', result)
          setScanResult(result.data)
          stopScan()
          toast.success('QRコードの読み取りに成功しました。')
        },
        {
          maxScansPerSecond: 1,
          highlightCodeOutline: true,
          highlightScanRegion: true,
          onDecodeError: (error) => {
            console.error(error)
            // toast.error('QRコードの読み取りに失敗しました。')
          },
        }
      )
    }

    if (qrScanner.current && scanStatus === 'loading') {
      toast
        .promise(qrScanner.current.start(), {
          pending: 'QRコード読み取り起動',
          success: 'QRコードの読み取り開始',
          error: 'QRコードの読み取り失敗',
        })
        .then(() => {
          console.log('qrScanner started')
          setScanStatus('scanning')
        })
    }
  }, [open, scanStatus])

  const startScan = () => {
    setScanResult('')
    setScanStatus('loading')
    videoElmRef.current?.classList.remove('hidden')
  }

  const stopScan = () => {
    qrScanner.current?.stop()
    setOpen(false)
    setScanStatus('')
    videoElmRef.current?.classList.add('hidden')
  }

  const cancelScan = () => {
    qrScanner.current?.stop()
    setScanStatus('')
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => stopScan()}
        title="会員QRコード読み取り"
        large
      >
        <Modal.Section>
          <div className="flex-center flex-col gap-8">
            {scanStatus === 'scanning' && (
              <p className="text-center text-lg font-bold leading-none">
                カメラをQRコードに向けてください !
              </p>
            )}
            <video className="hidden w-3/4" ref={videoElmRef} />
            {!scanStatus && (
              <>
                <button
                  className="inline-flex w-72 items-center justify-center rounded-lg bg-blue-500 p-8 py-4 text-lg font-bold text-white"
                  onClick={() => startScan()}
                >
                  会員QRコードを読み取る
                </button>
                <Link
                  to={`${prefix}/order`}
                  className="inline-flex w-72 items-center justify-center rounded-lg bg-black p-8 py-4 text-lg font-bold text-white"
                >
                  会員連携せずに購入
                </Link>
              </>
            )}
            <button
              className="inline-flex w-72 items-center justify-center rounded-lg bg-gray-500 p-8 py-4 text-lg font-bold text-white"
              onClick={() => cancelScan()}
            >
              キャンセル
            </button>
          </div>
        </Modal.Section>
      </Modal>
      {scanResult}
      <div className="flex-center h-screen gap-12 p-16">
        <Link
          to={`${prefix}/tickets`}
          className="inline-flex h-56 w-96 items-center justify-center rounded-lg bg-black p-8"
        >
          <span className="text-center text-3xl font-bold leading-relaxed text-white">
            チケット
            <br />
            受け取る
          </span>
        </Link>
        <button
          className="inline-flex h-56 w-96 items-center justify-center rounded-lg bg-black p-8"
          onClick={() => setOpen(true)}
        >
          <span className="text-center text-3xl font-bold leading-relaxed text-white">
            チケットの購入
          </span>
        </button>
      </div>
    </>
  )
}
