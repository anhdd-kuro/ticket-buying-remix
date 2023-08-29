import { numberOrStringToJpy } from '~/utils'
import { Form, Link } from '@remix-run/react'
import { Modal } from '@shopify/polaris'
import { useState } from 'react'
import { z } from 'zod'
import type { Ticket } from '~/stores'

type Props = {
  tickets: Ticket[]
  formAction: string
  movie: string
  showId: string
}

const OrderConfirm = ({ tickets, formAction, movie, showId }: Props) => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="mx-auto flex h-full w-2/3 flex-col p-8">
      <h1 className="text-center text-2xl font-bold">購入チケット確認</h1>
      <ul className="mt-12 grid grid-cols-2 gap-4">
        {tickets.map((ticket) => (
          <li
            key={ticket.seat}
            className="rounded-lg bg-gray-200 p-4 shadow-md"
          >
            <p>作品: {movie}</p>
            <p>座席: {ticket.seat}</p>
            <p>金額: {numberOrStringToJpy(ticket.price)}</p>
          </li>
        ))}
      </ul>
      <p className="my-4 text-center text-xl font-bold">
        合計金額:
        {numberOrStringToJpy(
          tickets.reduce((acc, ticket) => acc + (ticket.price || 0), 0)
        )}
      </p>
      <h2 className="font-bold">利用規約</h2>
      <div
        id="scrollable"
        className="mt-2 h-[200px] overflow-y-auto bg-gray-200 p-4"
      >
        <p>
          株式会社エイジオン（以下「当社」という）およびKBCシネマ1・2（以下「当劇場」という）は、オンラインチケット販売（以下「本サービス」という）をご利用いただくに当たって“オンラインチケット購入（決済）等に関する利用規約”（以下「本規約」という）を以下の通り定めます。本規約にご同意の上、本サービスをご利用ください。
        </p>

        <p>
          1. 利用条件
          <br />
          （1）本サービスは、当社のオンラインチケット販売システムを利用する当劇場で、上映される作品およびイベント（以下「興行」という）のチケット購入（決済）にご利用いただけます。
          <br />
          （2）本サービスをご利用いただけるのは、本規約に同意されたお客様のみです。お客様が本規約に違反した場合には、本サービスのご利用をお断りする場合がございます。
          <br />
          （3）本サービスは、お客様ご自身の責任で、デバイスの操作およびインターネットの利用ができ、本サービスご利用に必要な、文字表示や電子メール等の諸設定が、適切になされている方を対象にしております。
          <br />
          （4）上記条件を満たしていても、お客様の誤操作、お客様が使用されているデバイスのOSや通信環境の事情によって、本サービスが正常に作動しない場合、それらがもたらす諸影響について、当社および当劇場は、一切責任を負いません。当社および当劇場は、本サービスの内容およびお客様が、本サービスを通じて取得する情報等の完全性、正確性、確実性、有用性等について、いかなる保証も致しません。
          <br />
          （5）当社および当劇場は、お客様へ事前に通知することなく、本規約の内容を随時変更、追加、削除、その他当社および当劇場が、必要と判断した措置を行うことができるものとします。本サービスをご利用の際は、必ず、最新の本規約をご確認ください。またかかる効力は、本サービスの変更内容が公表された時点で生じるものとします。
        </p>
        <p>
          2．販売について
          <br />
          （1）本サービスをご利用の際、お客様には、販売画面内の指示に従い、お客様の「氏名」、「電話番号」および「電子メールアドレス」の情報（以下「個人情報」という）を、正確にご入力いただきます。なお、入力された個人情報が不正確な場合、お申込みは無効となります。
          <br />
          （2）本サービスにおいて、お客様の誤操作、お客様が使用されているデバイスのOSや通信環境の事情によって、本サービスが正常に作動せず、重複してご購入（決済）いただいた場合でも、当社および当劇場は一切責任を負いません。また、その代金についての払い戻しは一切致しません。
          <br />
          （3）本サービスにおいて、お客様がチケットご購入（決済）時に、指定可能な事項は、販売画面内で選択可能な範囲に限ります。一部の興行に関しては、取扱いがない、または本サービスで用意されている機能の一部または全部をご利用できない場合がございます。
          <br />
          （4）本サービスは、インターネットを利用したリアルタイムチケット購入（決済）システムであるため、通信回線の混雑、サーバーまたはコンピューターシステム上の不慮の事故等により、チケット購入（決済）の成否の確定もしくはその通知が大幅に遅れ、または不可能となる場合がございます。
          <br />
          （5）当社および当劇場は、前項に定めるチケット購入（決済）の成否について、お客様および第三者に対し、一切責任を負いません。
          <br />
          （6）当社および当劇場は、一定期間内のお申込み可能枚数を設定する場合があり、お客様へ事前に通知することなく、この枚数を変更する場合がございます。
          <br />
          （7）本サービスにおいて、意図的であるか否かを問わず、特定のお客様が同じ内容のチケット購入（決済）を多数回行い、当社および当劇場が、購入意思のない購入（決済）と判断した場合、当該お客様による全てのご購入（決済）に対して、その後のいかなる購入（決済）手続きも行わない場合がございます。また、当社および当劇場が、不適切な購入（決済）と判断した場合には、以後のご利用をお断りする場合がございます。
          <br />
          （8）本サービスでのご購入（決済）完了後、当劇場の事情により、興行を中止した場合を除き、理由の如何にかかわらず、興行・上映開始時刻・座席の変更およびご購入（決済）のキャンセル、払い戻し等は一切受け付けておりません。また、鑑賞されなかった場合や、お客様のご都合でチケットをお引取りにならない場合も、払い戻し等は一切致しませんので、予めご注意ください。
          <br />
          （9）チケットのご購入（決済）が完了後、当社および当劇場は、お客様に対して「予約番号」を発行致します。自動発券機にてチケットを取得する際、「予約番号」とご購入時にご入力いただいた「電話番号」が必要となります。
          <br />
          （10）チケットのお引渡しは、当劇場に設置の自動発券機によるものとさせていただきます。上映開始時刻を著しく過ぎてしまった場合は、ご入場をお断りさせていただく場合がございますので、予めご注意ください。
          <br />
          （11）何らかの理由によりご購入対象興行が上映・実施中止、または中断となり再開せず、払い戻しを行う場合は、原則として当該チケットを回収し、払い戻し金額はチケット券面額を上限とし、それ以外の費用は適用外となります。ご利用のクレジットカード会社の処理方法による決済の取消、または、チケットとの交換による現金での払い戻しとなります。払い戻し方法・期間・場所は、原則として、当劇場へお問い合わせください。ただし、払い戻し期間を過ぎた場合、発券済のチケットを紛失・破損したり、または汚損し判読しがたいと当劇場が判断した場合には、一切の払い戻しは致しません。
          <br />
          （12）当劇場は、やむを得ず、上映スクリーンを変更する場合がございます。その際、座席が変更になる場合がございますので、予めご了承ください。
          <br />
          （13）チケットのご購入（決済）が完了後、当社および当劇場は、お客様に対して「ご購入（決済）確認の電子メール」を送信させていただきます。販売画面内のオーダーフォームへの入力漏れ、正しくない電子メールアドレスの入力、判読不可能な文字化け現象等、お客様からのお申込み内容に何らかの不具合が生じた場合、電子メールを送信できないことがあります。電子メールの不達・誤達・遅達等について、当社および当劇場は一切責任を負いません。
        </p>
        <p>
          3. 料金について
          <br />
          （1）本サービスは、当劇場規定の料金体系に基づいてご利用いただくことを前提とします。チケットのご購入（決済）時には、適切なチケット種別をご指定ください。誤ったチケット種別をご購入（決済）いただいた場合でも、返金等の対応は致しません。
          <br />
          （2）チケットの価格は、全国的な料金体系に基づいて設定されておりますが、興行・地域によって異なる場合がございます。
          <br />
          （3）一般料金以外のチケットをご購入（決済）の場合は、ご入場時に各種証明書をご提示いただきます。ご来場の際には、各種証明書をご持参ください。ご提示いただけない場合は、ご入場をお断り致します。
          <br />
          （4）映画倫理協会が定めた、レイティング（鑑賞年齢制限）および各都道府県が条例等（当劇場の加盟する団体が当該都道府県との間で締結する自主規制規約等を含む。）に従うものとし、興行のご入場時に年齢確認をさせていただく場合がございます。
          <br />
          （5）当社および当劇場が定めるものの他は、本サービスと前売券または各種割引券との併用はできません。
        </p>
        <p>
          4. 決済について
          <br />
          （1）本サービスにおいて提供する決済方法について、以下のように規定します。
          <br />
          ①
          国内発行、かつ、当社および当劇場指定のクレジットカード、およびその他当社および当劇場の指定する決済方法をお持ちのお客様にご利用いただけます。
          <br />
          ②
          クレジットカード、またはその他当社および当劇場の指定する決済方法の与信手続き完了をもって販売契約の成立とします。
          <br />
          （2）販売画面内における虚偽入力、誤入力もしくは入力漏れ、またはクレジットカード発行会社、またはその他当社および当劇場の指定する決済会社の規約等に準じない等、何らかの理由で、お客様の選択された決済方法による決済ができない場合には、チケット購入は無効となります。お取り扱いできなかった場合のお問い合わせ等は、クレジットカード発行会社、またはその他当社および当劇場の指定する決済会社に直接お問い合わせください。
          <br />
          （3）本サービスは成年者を対象としております。未成年者が本サービスをご利用される場合、必ず保護者同意の上でご利用ください。未成年者が本サービスをご利用された場合、全ての事項において保護者の同意を得たものとみなします。
          <br />
          （4）クレジットカードおよびその他当社および当劇場の指定する決済方法のご利用におけるトラブルについて、当社および当劇場は一切責任を負いません。
        </p>
        <p>
          5. 禁止行為
          <br />
          （1）お客様は本サービスのご利用にあたり、以下の行為は、禁止させていただきます。
          <br />
          ①
          本サービスをご利用される他のお客様およびその他の第三者に迷惑もしくは不利益を及ぼす行為、または、本サービスおよびその他のサービスに支障が生じる行為、転売目的によるチケットの購入（決済）および購入したチケットの営利目的での転売
          <br />
          ②
          目的の如何を問わず、本サービスを通じて、もしくは本サービスに関連して得られた権利またはチケットを第三者に転売、または転売のために第三者に提供する行為、その準備をする行為、幇助を行う行為
          <br />
          ③ 法令等に違反する行為またはその恐れのある行為
          <br />
          ④
          権利者の許諾を得ることなく、いかなる方法によっても、本サービスを通じて提供される著作物等を著作権法で定める個人の私的使用の範囲を超えて使用する行為
          <br />
          ⑤
          コンピューターウィルス等の有害なプログラムを、本サービスを通じて、もしくは本サービスに関連して使用し、または提供・幇助する行為
          <br />
          ⑥
          公序良俗に反する、もしくはその恐れのある行為、または公序良俗に反する情報を、本サービスをご利用される他のお客様もしくは第三者に提供する行為
          <br />
          ⑦ 政治・宗教・性風俗に関する行為
          <br />
          （2）当社および当劇場において、上記禁止行為の何れかに該当する違反行為を確認した場合には、以下の対応を取らせていただきます。
          <br />
          ①
          禁止行為によって購入（決済）し、または禁止行為によって処分し、もしくは処分することを試みたチケットについては無効とし、当劇場等へのご入場をお断りします。また、既に当該チケットによって当劇場等にご入場している場合には、退場させることがあります。これらの場合、当社および当劇場は当該チケットの代金を一切返金しないものとします。
          <br />
          ②
          本サービスでの購入（決済）以外の方法により取得したチケットに関するトラブルについては、当社は一切責任を負いません。
          <br />③
          その他インターネット利用の一般的なマナーおよびモラルを遵守していただきます。当社および当劇場が不適切と判断する行為を行うお客様には、本サービスのご利用をお断りする場合があります。
        </p>
        <p>
          6. チケットの取り扱いついて
          <br />
          （1）チケットを紛失した場合、チケットをご購入（決済）の証明がある場合を除き、再発行は行いません。
          <br />
          （2）チケットの内容の変更は、当社および当劇場側の責に帰すべき事由による場合を除き、受け付けません。
        </p>
        <p>
          7. お客様の情報について
          <br />
          （1）当社および当劇場は個人情報保護法に基づき個人情報を厳重に管理し、送信の際に暗号化処理等を行うなど、機密保持のために充分なセキュリティー体制を敷いています。ただし、通信回線、サーバーまたはコンピューター等の障害によるデータの消失等の防止については保証致しません。
          <br />
          （2）当社および当劇場はお客様の個人情報を利用して、電子メールその他の手段によりチケットの購入（決済）・販売等に関する通知等をお客様に発信することができるものとします。
          <br />
          （3）お客様は当社および当劇場に対し、お申込の際に入力した個人情報を以下、各利用目的の範囲内で利用することに同意するものとします。
          <br />
          ① 興行のチケット購入（決済）の確認のため
          <br />
          ② お問い合わせへの回答のため
          <br />
          ③ 本サービスの改善または新たなサービスの開発を行うため
          <br />
          ④
          当社および当劇場の実施するキャンペーン・興行のご案内やサービスのお知らせのため
          <br />
          ⑤ アンケート調査ならびに景品等の送付を行うため
          <br />
          ⑥ 興行や新商品のご案内のため
          <br />
          ⑦ その他本サービスに伴う業務の実施のため
          <br />
          （4）当社および当劇場はお客様がお申込みの際に入力した個人情報を、以下の項目に該当する場合または正当な理由のある場合を除き、第三者に対して開示しないものとします。
          <br />
          ① 業務委託等、本サービスの運営上必要な場合
          <br />
          ② お客様が個人情報の開示について同意している場合
          <br />
          ③ 法令に基づき、行政官庁または司法機関等により開示を求められた場合
          <br />④ その他法令等で定められた場合
        </p>
        <p>
          8. システムに関する項目
          <br />
          （1）本サービスは、一部当社および当劇場以外のサイトおよびサーバーに接続します。
          <br />
          （2）本サービスはセキュア通信を採用しています。
          <br />
          （3）本サービスの利用途中で、意図的であるか否かを問わずお客様がご利用のブラウザの長時間の停止・終了、デバイスの停止・終了、ネットワークの切断等の行為を行った場合、通信環境の事情に生じるいかなる問題にも当社および当劇場は一切責任を負いません。
        </p>
        <p>
          9. cookieの使用について
          <br />
          （1）本サービスの一部では、サイト内でのお客様の行動履歴やお客様のアクセス環境の情報を取得するために、cookieを使用します。
          <br />
          （2）ただし、これらの情報はお客様個人を特定することのできる情報ではございません。{' '}
          <br />
          （3）また、お客様がブラウザに関する情報の収集を希望しない場合は、インターネット閲覧ソフト(ブラウザ)をご自身で設定することにより、cookieの機能を無効にすることも可能です。
        </p>
        <p>
          10. 本サービスの内容変更・中断・中止について
          <br />
          （1）当社および当劇場は本サービスの運営上、そのシステムや内容の変更が必要であると判断した場合、お客様へ事前に通知することなく、本サービスの内容に変更・中断・中止を行うことがあります。またかかる効力は、本サービスの変更内容が公表された時点に生じるものとします。
          <br />
          （2）当社および当劇場は以下の各号に該当する場合には、お客様へ事前に通知することなく、本サービスの一部もしくは、全部を一時中断または中止する場合があります。また、これに伴うお客様に不利益、損害が発生した場合、当社および当劇場は一切責任を負いません。
          <br />
          ①
          本サービスのシステムの定期的または突発的な理由による、更新、緊急の保守・点検を行う場合
          <br />
          ② 当社および当劇場が本サービスの運営上必要と判断した場合
          <br />
          ③
          天災地変・戦争・暴動・騒乱・労働争議・火災・停電・道路・鉄道・航空等の交通事情およびネットワーク通信事情、行政による自粛要請、第三者による妨害行為等により本サービスの提供ができなくなった場合
          <br />④
          その他、不測の事態により、当社および当劇場が本サービスの提供が困難と判断した場合
        </p>
        <p>
          11. 免責
          <br />
          （1）コンピューターウィルスおよびその他の有害物によるお客様の損害について当社および当劇場は一切責任を負いません。
          <br />
          （2）当劇場内において、当劇場関係者の指示に従わないことにより発生した損害については、当社および当劇場は一切責任を負いません。
          <br />
          （3）お客様同士のトラブルおよびそのトラブルにより生じた損害について、当社および当劇場は一切責任を負いません。
        </p>
        <p>
          12. 知的財産権について
          <br />
          本サービスに関する特許権、商標権、著作権、その他の権利は当社、当劇場および著作者に帰属します。当社、当劇場および著作者に無断で使用することはできません。
        </p>
        <p>
          13. 紛争解決、準拠法および管轄裁判所
          <br />
          （1）本規約の解釈、適用にかかわる準拠法は日本法とします。
          <br />
          （2）本サービスに関連して、お客様と当社および当劇場との間で紛争が生じた場合には、双方誠意を持って協議の上解決するものとします。
          <br />
          （3）本サービスに関連して、お客様が他のお客様もしくは第三者に損害を与えた場合、またはお客様と他のお客様もしくは第三者との間に紛争が生じた場合、お客様は自己の費用と責任でかかる損害を賠償し、またはかかる紛争を解決するものとし、当社および当劇場に何らの迷惑や損害を与えないものとします。
          <br />
          （4）協議をしても紛争を解決できない場合には、福岡地方裁判所又は福岡簡易裁判所を第一審の専属的管轄裁判所とします。
        </p>
        <br />
        <p>2019年 11月5日制定</p>
      </div>
      <button
        type="submit"
        className="mx-auto mt-4 block rounded border bg-[#626367] px-16 py-3 text-white"
        onClick={() => setOpen(true)}
      >
        {/* Create Draft Order ( 下書き注文を作成 ) */}
        KBCシネマの利用規約に同意する
      </button>
      <div className="mb-0 mt-auto flex gap-4">
        <Link
          to="/order"
          type="button"
          className="rounded bg-black px-4 py-2 text-lg font-bold text-white"
        >
          初めからやり直す
        </Link>
        <Link
          to={`/order?movie=${movie}&showId=${showId}`}
          type="submit"
          className="rounded bg-black px-4 py-2 text-lg font-bold text-white"
        >
          座席を選び直す
        </Link>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="メール登録">
        <Modal.Section>
          <div>
            <Form
              method="post"
              action={formAction}
              className="flex flex-col gap-4"
            >
              <input
                name="email"
                type="email"
                value={email || ''}
                hidden
                readOnly
              />
              <input
                name="movie"
                type="text"
                value={movie || ''}
                hidden
                readOnly
              />
              <input
                name="tickets"
                type="text"
                value={JSON.stringify(tickets)}
                hidden
                readOnly
              />
              <p>
                メール登録はいかがですか <br />
                ・メールからお支払いを行うことができます
                <br />
                ・会員の方はメールを入力してください
              </p>
              <input
                type="email"
                name="email"
                value={email}
                className="rounded-md border p-2"
                placeholder="メールを入力してください"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="mx-auto rounded-lg bg-blue-500 p-4 px-16 text-white disabled:bg-gray-400"
                disabled={!z.string().email().safeParse(email).success}
              >
                同時にアカウント登録して購入
              </button>
              <button
                type="submit"
                className="mx-auto rounded-lg bg-blue-500 p-4 px-16 text-white disabled:bg-gray-400"
              >
                登録せずに購入
              </button>
              {/* All tickets information */}
              <input
                type="hidden"
                name="tickets"
                value={JSON.stringify(tickets)}
              />
            </Form>
          </div>
        </Modal.Section>
      </Modal>
    </div>
  )
}

export default OrderConfirm
