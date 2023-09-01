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

  useEffect(() => {
    console.log('videoElmRef', videoElmRef.current)
    if (!videoElmRef.current) {
      return
    }

    if (open) {
      qrScanner.current = new QrScanner(
        videoElmRef.current,
        (result) => {
          console.log('decoded qr code:', result)
          qrScanner.current?.stop()
          setScanResult(result.data)
          toast.success('QRコードの読み取りに成功しました。')
        },
        {
          maxScansPerSecond: 1,
          onDecodeError: (error) => {
            console.error(error)
            // toast.error('QRコードの読み取りに失敗しました。')
          },
        }
      )

      toast.promise(qrScanner.current.start(), {
        pending: 'QRコードの読み取りを起動します',
        success: 'QRコードの読み取りを開始しました。',
        error: 'QRコードの読み取りに失敗しました。',
      })
    }
  }, [open])

  const startScan = () => {
    setOpen(true)
    setScanResult('')
  }

  const stopScan = () => {
    setOpen(false)
    setScanResult('')
    qrScanner.current?.stop()
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="会員QRコード読み取り"
        large
      >
        <Modal.Section>
          <div className="flex-center flex-col gap-8">
            <video className="w-3/4" ref={videoElmRef} />
            {scanResult}
            <button
              className="inline-flex w-64 items-center justify-center rounded-lg bg-black p-8 py-4 text-lg font-bold text-white"
              onClick={() => stopScan()}
            >
              キャンセル
            </button>
          </div>
        </Modal.Section>
      </Modal>
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
          // to={`${prefix}/order`}
          className="inline-flex h-56 w-96 items-center justify-center rounded-lg bg-black p-8"
          onClick={startScan}
        >
          <span className="text-center text-3xl font-bold leading-relaxed text-white">
            チケットの購入
          </span>
        </button>
      </div>
    </>
  )
}
