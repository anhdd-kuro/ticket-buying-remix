import * as React from 'react'
import type { SVGProps } from 'react'
const SvgSeat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="screenImg"
    style={{
      userSelect: 'none',
    }}
    viewBox="0 0 800 1000"
    {...props}
  >
    <style>
      {
        '@import url(https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap);g#seatmap text{font-family:"Noto Sans","sans-serif"}g.not circle,g.not path,g.not polygon,g.not text{fill:#4b4b4b}.st0{font-family:"Noto Sans"}.st2{fill:#030}.st3{font-size:16px}.st4{fill:#dae5da}.st5{font-size:20px}'
      }
    </style>
    <g id="theater">
      <path d="M715 128h10v85h-10zM230 107h340v10H230z" />
      <path
        d="M80 87h640v742H80z"
        style={{
          fill: 'none',
          stroke: '#000',
          strokeWidth: 4,
        }}
      />
      <path d="M741.117 150.017v-1.365h5.418v-3.233h-5.775v-1.429h5.775v-2.877h1.638v8.757c0 .868-.028 1.604-.084 2.205.196-.056.651-.217 1.365-.482l.314 1.428c-.279.099-.917.315-1.91.651-.309 1.54-.872 2.811-1.69 3.812-.819 1-1.999 1.9-3.539 2.698l-1.05-1.344c1.189-.588 2.132-1.235 2.824-1.942.693-.707 1.215-1.586 1.564-2.636a70.118 70.118 0 0 1-5.229 1.323l-.294-1.429a71.424 71.424 0 0 0 5.88-1.533c.111-.728.182-1.596.21-2.604h-5.417zm18.333 3.632v1.428h-6.363v4.81h-1.68v-18.774h1.68v2.877h6.153v1.429h-6.153v3.297h5.796v1.364h-5.796v3.57h6.363zM743.385 162.344l1.429-.42c.447.616.951 1.407 1.512 2.373h2.835v-2.667h1.68v2.667h2.919c.518-.84.987-1.673 1.407-2.499l1.407.42c-.252.518-.638 1.211-1.155 2.079h3.57v4.83h-1.597v-3.466h-14.783v3.466h-1.597v-4.83h3.633a46.77 46.77 0 0 0-1.26-1.953zm2.163 9.996h-1.638v-5.523h12.18v5.523h-5.354v1.322h7.098v3.718c0 1.134-.119 1.837-.357 2.11-.238.272-.84.409-1.806.409-.434 0-1.344-.035-2.729-.104l-.063-1.407c1.05.07 1.841.104 2.373.104.476 0 .76-.052.851-.157.091-.104.137-.438.137-.997v-2.269h-5.502v5.817h-1.681v-5.817h-5.292v4.978h-1.596v-6.385h6.888v-1.322h-3.509zm0-1.261h8.904v-3.003h-8.904v3.003zM741.705 184.478h16.59v17.01h-1.68v-1.322h-13.23v1.322h-1.68v-17.01zm1.68 14.28h13.23v-12.831h-13.23v12.831zM230 824h340v10H230zM374.767 799.733v5.396h4.893v-7.203h1.68v7.203h4.893v-5.396h1.617v6.804h-6.51v7.455h5.88v-5.775h1.617v8.526h-1.617v-1.323h-13.44v1.323h-1.617v-8.526h1.617v5.775h5.88v-7.455h-6.51v-6.804h1.617zM401.248 800.3h-5.754v-1.47h7.434v1.953c0 3.178.728 6.107 2.184 8.788 1.456 2.682 3.353 4.624 5.691 5.828l-.861 1.26c-1.806-.868-3.409-2.271-4.809-4.211-1.4-1.938-2.422-4.126-3.066-6.563a19.528 19.528 0 0 1-3.581 6.426c-1.617 1.946-3.426 3.396-5.428 4.348l-.861-1.26c2.59-1.288 4.746-3.276 6.468-5.965 1.722-2.688 2.583-5.383 2.583-8.085V800.3zM414.205 799.418h16.59v17.01h-1.68v-1.322h-13.23v1.322h-1.68v-17.01zm1.68 14.28h13.23v-12.831h-13.23v12.831zM357.864 40.58a408.01 408.01 0 0 1 9.184 1.764l-.532 2.716a395.974 395.974 0 0 0-9.184-1.764l.532-2.716zm19.236-3.108 2.8.477c-1.045 5.898-3.192 10.238-6.44 13.02s-8.102 4.452-14.56 5.013l-.42-2.801c5.917-.504 10.267-1.927 13.048-4.27s4.639-6.156 5.572-11.439zm-17.976-3.752c2.65.43 5.824 1.018 9.52 1.765l-.532 2.716c-3.696-.746-6.87-1.335-9.52-1.765l.532-2.716zM385.78 36.66h8.596V32.6h3.08v4.061h9.044v2.66c-1.55 2.427-3.622 4.545-6.216 6.355a259.432 259.432 0 0 1 7.56 5.433l-1.848 2.184c-2.184-1.624-4.975-3.603-8.372-5.936l-.168.084v9.239h-3.08v-7.728c-2.968 1.288-6.169 2.324-9.604 3.107l-.7-2.716c4.237-.97 7.961-2.314 11.172-4.032 3.21-1.717 5.777-3.714 7.7-5.991H385.78v-2.66zM412.8 37.584V34.84h22.344v2.744c-.747 2.482-2.077 4.788-3.99 6.916s-4.316 3.948-7.21 5.46c.374.542 1.502 2.222 3.388 5.04l-2.604 1.624c-3.043-4.573-5.89-8.633-8.54-12.18l2.52-1.708a308.126 308.126 0 0 1 3.472 4.731 22.765 22.765 0 0 0 6.118-4.41c1.783-1.801 3-3.626 3.654-5.474H412.8zM451.86 55V38.144h-.056l-6.3 4.816-1.204-2.52 7.56-5.881h3.08V55h-3.08zM372.737 125.508c-.825 0-1.496.198-2.014.594-.518.396-.776.912-.776 1.549 0 .695.206 1.274.619 1.736.412.462 1.099.886 2.059 1.27 1.53.576 2.587 1.17 3.172 1.782.585.611.877 1.416.877 2.411 0 1.08-.36 1.905-1.08 2.476-.72.57-1.748.854-3.083.854a6.93 6.93 0 0 1-3.6-.972v-1.08c1.17.816 2.392 1.224 3.667 1.224.959 0 1.691-.213 2.194-.639.502-.426.753-1.047.753-1.863 0-.768-.221-1.395-.664-1.881-.443-.485-1.226-.944-2.351-1.377-1.335-.504-2.288-1.064-2.858-1.683-.57-.618-.855-1.371-.855-2.259 0-.876.356-1.59 1.069-2.143.712-.552 1.646-.828 2.801-.828 1.29 0 2.475.24 3.555.721v1.025c-1.107-.611-2.269-.917-3.485-.917zM384.82 125.508c-2.655 0-3.982 1.975-3.982 5.922 0 3.948 1.328 5.922 3.982 5.922.945 0 1.868-.216 2.768-.647v.918a7.08 7.08 0 0 1-2.813.558c-.75 0-1.414-.104-1.991-.314-.578-.21-1.106-.562-1.586-1.054-.48-.491-.847-1.19-1.102-2.097-.255-.905-.383-2.001-.383-3.285 0-2.315.424-4.02 1.271-5.111.847-1.092 2.111-1.639 3.791-1.639.93 0 1.83.187 2.7.559v.882a6.168 6.168 0 0 0-2.655-.614zM399.445 128.19c0 1.8-.938 2.945-2.813 3.438v.036c.75.24 1.357 1.032 1.823 2.376l1.395 3.96h-1.215l-1.305-3.942c-.27-.804-.611-1.353-1.024-1.646s-1.061-.441-1.946-.441h-1.867V138h-1.147v-13.068c1.049-.168 2.1-.252 3.15-.252 1.68 0 2.925.288 3.735.864s1.214 1.458 1.214 2.646zm-6.952 2.97h1.575c1.53 0 2.622-.228 3.274-.685.652-.455.979-1.218.979-2.285 0-.925-.319-1.605-.956-2.043-.638-.438-1.624-.657-2.959-.657-.705 0-1.342.048-1.912.144v5.526zM403.855 125.688v4.752h6.053v.81h-6.053v5.922h6.277V138h-7.425v-13.14h7.425v.828h-6.277zM415.105 125.688v4.752h6.053v.81h-6.053v5.922h6.277V138h-7.425v-13.14h7.425v.828h-6.277zM432.813 124.86V138h-1.26l-5.4-11.25h-.045V138h-1.17v-13.14h1.305l5.4 11.25h.045v-11.25h1.125z" />
    </g>
    <g id="seatmap">
      <g id="J-3">
        <path d="M514 178h9.818v7.409h16.364V178H550v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(526.176 207)">
          {'3'}
        </text>
      </g>
      <g id="J-4">
        <path d="M470 178h9.818v7.409h16.364V178H506v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(482.176 207)">
          {'4'}
        </text>
      </g>
      <g id="J-5">
        <path d="M426 178h9.818v7.409h16.364V178H462v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(438.176 207)">
          {'5'}
        </text>
      </g>
      <g id="J-6">
        <path d="M382 178h9.818v7.409h16.364V178H418v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(394.176 207)">
          {'6'}
        </text>
      </g>
      <g id="J-7">
        <path d="M338 178h9.818v7.409h16.364V178H374v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(350.176 207)">
          {'7'}
        </text>
      </g>
      <g id="J-8">
        <path d="M294 178h9.818v7.409h16.364V178H330v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(306.176 207)">
          {'8'}
        </text>
      </g>
      <g id="J-9">
        <path d="M250 178h9.818v7.409h16.364V178H286v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(262.176 207)">
          {'9'}
        </text>
      </g>
      <g id="J-10">
        <path d="M206 178h9.818v7.409h16.364V178H242v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(212.352 207)">
          {'10'}
        </text>
      </g>
      <g id="J-11">
        <path d="M162 178h9.818v7.409h16.364V178H198v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(168.352 207)">
          {'11'}
        </text>
      </g>
      <g id="I-1">
        <path d="M602 239h9.818v7.409h16.364V239H638v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(614.176 268)">
          {'1'}
        </text>
      </g>
      <g id="I-2">
        <path d="M558 239h9.818v7.409h16.364V239H594v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(570.176 268)">
          {'2'}
        </text>
      </g>
      <g id="I-3">
        <path d="M514 239h9.818v7.409h16.364V239H550v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(526.176 268)">
          {'3'}
        </text>
      </g>
      <g id="I-4">
        <path d="M470 239h9.818v7.409h16.364V239H506v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(482.176 268)">
          {'4'}
        </text>
      </g>
      <g id="I-5">
        <path d="M426 239h9.818v7.409h16.364V239H462v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(438.176 268)">
          {'5'}
        </text>
      </g>
      <g id="I-6">
        <path d="M382 239h9.818v7.409h16.364V239H418v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(394.176 268)">
          {'6'}
        </text>
      </g>
      <g id="I-7">
        <path d="M338 239h9.818v7.409h16.364V239H374v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(350.176 268)">
          {'7'}
        </text>
      </g>
      <g id="I-8">
        <path d="M294 239h9.818v7.409h16.364V239H330v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(306.176 268)">
          {'8'}
        </text>
      </g>
      <g id="I-9">
        <path d="M250 239h9.818v7.409h16.364V239H286v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(262.176 268)">
          {'9'}
        </text>
      </g>
      <g id="I-10">
        <path d="M206 239h9.818v7.409h16.364V239H242v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(212.352 268)">
          {'10'}
        </text>
      </g>
      <g id="I-11">
        <path d="M162 239h9.818v7.409h16.364V239H198v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(168.352 268)">
          {'11'}
        </text>
      </g>
      <g id="H-1">
        <path d="M602 300h9.818v7.409h16.364V300H638v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(614.176 329)">
          {'1'}
        </text>
      </g>
      <g id="H-2" className="not">
        <path d="M558 300h9.818v7.409h16.364V300H594v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(570.176 329)">
          {'2'}
        </text>
      </g>
      <g id="H-3">
        <path d="M514 300h9.818v7.409h16.364V300H550v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(526.176 329)">
          {'3'}
        </text>
      </g>
      <g id="H-4">
        <path d="M470 300h9.818v7.409h16.364V300H506v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(482.176 329)">
          {'4'}
        </text>
      </g>
      <g id="H-5">
        <path d="M426 300h9.818v7.409h16.364V300H462v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(438.176 329)">
          {'5'}
        </text>
      </g>
      <g id="H-6">
        <path d="M382 300h9.818v7.409h16.364V300H418v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(394.176 329)">
          {'6'}
        </text>
      </g>
      <g id="H-7">
        <path d="M338 300h9.818v7.409h16.364V300H374v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(350.176 329)">
          {'7'}
        </text>
      </g>
      <g id="H-8">
        <path d="M294 300h9.818v7.409h16.364V300H330v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(306.176 329)">
          {'8'}
        </text>
      </g>
      <g id="H-9">
        <path d="M250 300h9.818v7.409h16.364V300H286v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(262.176 329)">
          {'9'}
        </text>
      </g>
      <g id="H-10">
        <path d="M206 300h9.818v7.409h16.364V300H242v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(212.352 329)">
          {'10'}
        </text>
      </g>
      <g id="H-11">
        <path d="M162 300h9.818v7.409h16.364V300H198v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(168.352 329)">
          {'11'}
        </text>
      </g>
      <g id="G-1">
        <path d="M602 361h9.818v7.409h16.364V361H638v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(614.176 390)">
          {'1'}
        </text>
      </g>
      <g id="G-2">
        <path d="M558 361h9.818v7.409h16.364V361H594v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(570.176 390)">
          {'2'}
        </text>
      </g>
      <g id="G-3">
        <path d="M514 361h9.818v7.409h16.364V361H550v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(526.176 390)">
          {'3'}
        </text>
      </g>
      <g id="G-4">
        <path d="M470 361h9.818v7.409h16.364V361H506v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(482.176 390)">
          {'4'}
        </text>
      </g>
      <g id="G-5">
        <path d="M426 361h9.818v7.409h16.364V361H462v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(438.176 390)">
          {'5'}
        </text>
      </g>
      <g id="G-6">
        <path d="M382 361h9.818v7.409h16.364V361H418v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(394.176 390)">
          {'6'}
        </text>
      </g>
      <g id="G-7">
        <path d="M338 361h9.818v7.409h16.364V361H374v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(350.176 390)">
          {'7'}
        </text>
      </g>
      <g id="G-8">
        <path d="M294 361h9.818v7.409h16.364V361H330v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(306.176 390)">
          {'8'}
        </text>
      </g>
      <g id="G-9">
        <path d="M250 361h9.818v7.409h16.364V361H286v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(262.176 390)">
          {'9'}
        </text>
      </g>
      <g id="G-10" className="not">
        <path d="M206 361h9.818v7.409h16.364V361H242v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(212.352 390)">
          {'10'}
        </text>
      </g>
      <g id="G-11" className="not">
        <path d="M162 361h9.818v7.409h16.364V361H198v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(168.352 390)">
          {'11'}
        </text>
      </g>
      <g id="F-1">
        <path d="M602 422h9.818v7.409h16.364V422H638v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(614.176 451)">
          {'1'}
        </text>
      </g>
      <g id="F-2">
        <path d="M558 422h9.818v7.409h16.364V422H594v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(570.176 451)">
          {'2'}
        </text>
      </g>
      <g id="F-3">
        <path d="M514 422h9.818v7.409h16.364V422H550v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(526.176 451)">
          {'3'}
        </text>
      </g>
      <g id="F-4">
        <path d="M470 422h9.818v7.409h16.364V422H506v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(482.176 451)">
          {'4'}
        </text>
      </g>
      <g id="F-5" className="not">
        <path d="M426 422h9.818v7.409h16.364V422H462v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(438.176 451)">
          {'5'}
        </text>
      </g>
      <g id="F-6">
        <path d="M382 422h9.818v7.409h16.364V422H418v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(394.176 451)">
          {'6'}
        </text>
      </g>
      <g id="F-7" className="not">
        <path d="M338 422h9.818v7.409h16.364V422H374v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(350.176 451)">
          {'7'}
        </text>
      </g>
      <g id="F-8" className="not">
        <path d="M294 422h9.818v7.409h16.364V422H330v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(306.176 451)">
          {'8'}
        </text>
      </g>
      <g id="F-9">
        <path d="M250 422h9.818v7.409h16.364V422H286v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(262.176 451)">
          {'9'}
        </text>
      </g>
      <g id="F-10">
        <path d="M206 422h9.818v7.409h16.364V422H242v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(212.352 451)">
          {'10'}
        </text>
      </g>
      <g id="F-11">
        <path d="M162 422h9.818v7.409h16.364V422H198v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(168.352 451)">
          {'11'}
        </text>
      </g>
      <g id="E-1" className="not">
        <path d="M602 483h9.818v7.409h16.364V483H638v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(614.176 512)">
          {'1'}
        </text>
      </g>
      <g id="E-2" className="not">
        <path d="M558 483h9.818v7.409h16.364V483H594v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(570.176 512)">
          {'2'}
        </text>
      </g>
      <g id="E-3">
        <path d="M514 483h9.818v7.409h16.364V483H550v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(526.176 512)">
          {'3'}
        </text>
      </g>
      <g id="E-4">
        <path d="M470 483h9.818v7.409h16.364V483H506v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(482.176 512)">
          {'4'}
        </text>
      </g>
      <g id="E-5" className="not">
        <path d="M426 483h9.818v7.409h16.364V483H462v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(438.176 512)">
          {'5'}
        </text>
      </g>
      <g id="E-6" className="not">
        <path d="M382 483h9.818v7.409h16.364V483H418v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(394.176 512)">
          {'6'}
        </text>
      </g>
      <g id="E-7">
        <path d="M338 483h9.818v7.409h16.364V483H374v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(350.176 512)">
          {'7'}
        </text>
      </g>
      <g id="E-8">
        <path d="M294 483h9.818v7.409h16.364V483H330v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(306.176 512)">
          {'8'}
        </text>
      </g>
      <g id="E-9">
        <path d="M250 483h9.818v7.409h16.364V483H286v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(262.176 512)">
          {'9'}
        </text>
      </g>
      <g id="E-10">
        <path d="M206 483h9.818v7.409h16.364V483H242v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(212.352 512)">
          {'10'}
        </text>
      </g>
      <g id="E-11">
        <path d="M162 483h9.818v7.409h16.364V483H198v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(168.352 512)">
          {'11'}
        </text>
      </g>
      <g id="D-1">
        <path d="M602 544h9.818v7.409h16.364V544H638v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(614.176 573)">
          {'1'}
        </text>
      </g>
      <g id="D-2">
        <path d="M558 544h9.818v7.409h16.364V544H594v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(570.176 573)">
          {'2'}
        </text>
      </g>
      <g id="D-3">
        <path d="M514 544h9.818v7.409h16.364V544H550v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(526.176 573)">
          {'3'}
        </text>
      </g>
      <g id="D-4">
        <path d="M470 544h9.818v7.409h16.364V544H506v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(482.176 573)">
          {'4'}
        </text>
      </g>
      <g id="D-5">
        <path d="M426 544h9.818v7.409h16.364V544H462v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(438.176 573)">
          {'5'}
        </text>
      </g>
      <g id="D-6">
        <path d="M382 544h9.818v7.409h16.364V544H418v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(394.176 573)">
          {'6'}
        </text>
      </g>
      <g id="D-7" className="not">
        <path d="M338 544h9.818v7.409h16.364V544H374v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(350.176 573)">
          {'7'}
        </text>
      </g>
      <g id="D-8">
        <path d="M294 544h9.818v7.409h16.364V544H330v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(306.176 573)">
          {'8'}
        </text>
      </g>
      <g id="D-9">
        <path d="M250 544h9.818v7.409h16.364V544H286v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(262.176 573)">
          {'9'}
        </text>
      </g>
      <g id="D-10">
        <path d="M206 544h9.818v7.409h16.364V544H242v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(212.352 573)">
          {'10'}
        </text>
      </g>
      <g id="D-11">
        <path d="M162 544h9.818v7.409h16.364V544H198v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(168.352 573)">
          {'11'}
        </text>
      </g>
      <g id="C-1">
        <path d="M602 605h9.818v7.409h16.364V605H638v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(614.176 634)">
          {'1'}
        </text>
      </g>
      <g id="C-2">
        <path d="M558 605h9.818v7.409h16.364V605H594v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(570.176 634)">
          {'2'}
        </text>
      </g>
      <g id="C-3">
        <path d="M514 605h9.818v7.409h16.364V605H550v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(526.176 634)">
          {'3'}
        </text>
      </g>
      <g id="C-4">
        <path d="M470 605h9.818v7.409h16.364V605H506v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(482.176 634)">
          {'4'}
        </text>
      </g>
      <g id="C-5">
        <path d="M426 605h9.818v7.409h16.364V605H462v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(438.176 634)">
          {'5'}
        </text>
      </g>
      <g id="C-6">
        <path d="M382 605h9.818v7.409h16.364V605H418v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(394.176 634)">
          {'6'}
        </text>
      </g>
      <g id="C-7" className="not">
        <path d="M338 605h9.818v7.409h16.364V605H374v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(350.176 634)">
          {'7'}
        </text>
      </g>
      <g id="C-8">
        <path d="M294 605h9.818v7.409h16.364V605H330v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(306.176 634)">
          {'8'}
        </text>
      </g>
      <g id="C-9">
        <path d="M250 605h9.818v7.409h16.364V605H286v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(262.176 634)">
          {'9'}
        </text>
      </g>
      <g id="C-10">
        <path d="M206 605h9.818v7.409h16.364V605H242v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(212.352 634)">
          {'10'}
        </text>
      </g>
      <g id="C-11">
        <path d="M162 605h9.818v7.409h16.364V605H198v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(168.352 634)">
          {'11'}
        </text>
      </g>
      <g id="B-1">
        <path d="M602 666h9.818v7.409h16.364V666H638v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(614.176 695)">
          {'1'}
        </text>
      </g>
      <g id="B-2">
        <path d="M558 666h9.818v7.409h16.364V666H594v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(570.176 695)">
          {'2'}
        </text>
      </g>
      <g id="B-3">
        <path d="M514 666h9.818v7.409h16.364V666H550v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(526.176 695)">
          {'3'}
        </text>
      </g>
      <g id="B-4">
        <path d="M470 666h9.818v7.409h16.364V666H506v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(482.176 695)">
          {'4'}
        </text>
      </g>
      <g id="B-5" className="not">
        <path d="M426 666h9.818v7.409h16.364V666H462v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(438.176 695)">
          {'5'}
        </text>
      </g>
      <g id="B-6">
        <path d="M382 666h9.818v7.409h16.364V666H418v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(394.176 695)">
          {'6'}
        </text>
      </g>
      <g id="B-7">
        <path d="M338 666h9.818v7.409h16.364V666H374v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(350.176 695)">
          {'7'}
        </text>
      </g>
      <g id="B-8">
        <path d="M294 666h9.818v7.409h16.364V666H330v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(306.176 695)">
          {'8'}
        </text>
      </g>
      <g id="B-9">
        <path d="M250 666h9.818v7.409h16.364V666H286v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(262.176 695)">
          {'9'}
        </text>
      </g>
      <g id="B-10">
        <path d="M206 666h9.818v7.409h16.364V666H242v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(212.352 695)">
          {'10'}
        </text>
      </g>
      <g id="B-11">
        <path d="M162 666h9.818v7.409h16.364V666H198v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(168.352 695)">
          {'11'}
        </text>
      </g>
      <g id="A-1">
        <path d="M602 727h9.818v7.409h16.364V727H638v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(614.176 756)">
          {'1'}
        </text>
      </g>
      <g id="A-2">
        <path d="M558 727h9.818v7.409h16.364V727H594v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(570.176 756)">
          {'2'}
        </text>
      </g>
      <g id="A-3">
        <path d="M514 727h9.818v7.409h16.364V727H550v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(526.176 756)">
          {'3'}
        </text>
      </g>
      <g id="A-4">
        <path d="M470 727h9.818v7.409h16.364V727H506v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(482.176 756)">
          {'4'}
        </text>
      </g>
      <g id="A-5">
        <path d="M426 727h9.818v7.409h16.364V727H462v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(438.176 756)">
          {'5'}
        </text>
      </g>
      <g id="A-6" className="not">
        <path d="M382 727h9.818v7.409h16.364V727H418v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(394.176 756)">
          {'6'}
        </text>
      </g>
      <g id="A-7" className="not">
        <path d="M338 727h9.818v7.409h16.364V727H374v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(350.176 756)">
          {'7'}
        </text>
      </g>
      <g id="A-8">
        <path d="M294 727h9.818v7.409h16.364V727H330v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(306.176 756)">
          {'8'}
        </text>
      </g>
      <g id="A-9">
        <path d="M250 727h9.818v7.409h16.364V727H286v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(262.176 756)">
          {'9'}
        </text>
      </g>
      <g id="A-10">
        <path d="M206 727h9.818v7.409h16.364V727H242v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(212.352 756)">
          {'10'}
        </text>
      </g>
      <g id="A-11" className="not">
        <path d="M162 727h9.818v7.409h16.364V727H198v36h-36z" className="st4" />
        <text className="st2 st0 st5" transform="translate(168.352 756)">
          {'11'}
        </text>
      </g>
      <g id="K-1" className="not">
        <circle cx={91} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(86.424 901)">
          {'1'}
        </text>
      </g>
      <g id="K-2" className="not">
        <circle cx={135} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(130.424 901)">
          {'2'}
        </text>
      </g>
      <g id="K-3" className="not">
        <circle cx={179} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(174.424 901)">
          {'3'}
        </text>
      </g>
      <g id="K-4" className="not">
        <circle cx={223} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(218.424 901)">
          {'4'}
        </text>
      </g>
      <g id="K-5" className="not">
        <circle cx={267} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(262.424 901)">
          {'5'}
        </text>
      </g>
      <g id="K-6" className="not">
        <circle cx={311} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(306.424 901)">
          {'6'}
        </text>
      </g>
      <g id="K-7" className="not">
        <circle cx={355} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(350.424 901)">
          {'7'}
        </text>
      </g>
      <g id="K-8" className="not">
        <circle cx={399} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(394.424 901)">
          {'8'}
        </text>
      </g>
      <g id="K-9" className="not">
        <circle cx={443} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(438.424 901)">
          {'9'}
        </text>
      </g>
      <g id="K-10" className="not">
        <circle cx={487} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(477.848 901)">
          {'10'}
        </text>
      </g>
      <g id="K-11" className="not">
        <circle cx={531} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(521.848 901)">
          {'11'}
        </text>
      </g>
      <g id="K-12" className="not">
        <circle cx={575} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(565.848 901)">
          {'12'}
        </text>
      </g>
      <g id="K-13" className="not">
        <circle cx={619} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(609.848 901)">
          {'13'}
        </text>
      </g>
      <g id="K-14" className="not">
        <circle cx={663} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(653.848 901)">
          {'14'}
        </text>
      </g>
      <g id="K-15" className="not">
        <circle cx={707} cy={895} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(697.848 901)">
          {'15'}
        </text>
      </g>
      <g id="K-16" className="not">
        <circle cx={91} cy={937} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(81.848 943)">
          {'16'}
        </text>
      </g>
      <g id="K-17" className="not">
        <circle cx={135} cy={937} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(125.848 943)">
          {'17'}
        </text>
      </g>
      <g id="K-18" className="not">
        <circle cx={179} cy={937} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(169.848 943)">
          {'18'}
        </text>
      </g>
      <g id="K-19" className="not">
        <circle cx={223} cy={937} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(213.848 943)">
          {'19'}
        </text>
      </g>
      <g id="K-20" className="not">
        <circle cx={267} cy={937} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(257.848 943)">
          {'20'}
        </text>
      </g>
      <g id="K-21" className="not">
        <circle cx={311} cy={937} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(301.848 943)">
          {'21'}
        </text>
      </g>
      <g id="K-22" className="not">
        <circle cx={355} cy={937} r={15} className="st4" />
        <text className="st2 st0 st3" transform="translate(345.848 943)">
          {'22'}
        </text>
      </g>
    </g>
    <g id="row">
      <path d="M132.352 749.96h-4.8l-1.104 5.04h-1.968l4.32-17.52h2.4l4.32 17.52h-2.064l-1.104-5.04zm-2.376-10.8h-.048l-1.992 9.12h4.032l-1.992-9.12zM134.92 688.96c0 3.521-1.8 5.28-5.4 5.28-1.28 0-2.52-.12-3.72-.36V676.6c1.2-.239 2.44-.359 3.72-.359 3.28 0 4.92 1.439 4.92 4.319 0 .977-.244 1.801-.732 2.473-.488.672-1.164 1.12-2.028 1.344v.048c.928.177 1.7.688 2.316 1.536.616.848.924 1.847.924 2.999zm-7.152-5.28h1.08c1.28 0 2.211-.235 2.796-.708.584-.472.876-1.195.876-2.172 0-.912-.288-1.62-.864-2.124-.576-.504-1.392-.756-2.448-.756-.576 0-1.056.064-1.44.192v5.568zm0 1.68v7.008c.592.128 1.312.191 2.16.191 2.016 0 3.024-1.279 3.024-3.84 0-2.239-1.288-3.359-3.864-3.359h-1.32zM125.32 624.24c0-3.152.484-5.44 1.452-6.864.968-1.424 2.404-2.136 4.308-2.136a6.53 6.53 0 0 1 3 .72v1.8c-.976-.527-1.936-.792-2.88-.792-2.64 0-3.96 2.424-3.96 7.272 0 2.624.336 4.492 1.008 5.604.672 1.112 1.656 1.668 2.952 1.668.992 0 1.992-.304 3-.912v1.92c-.944.48-1.984.721-3.12.721-1.952 0-3.4-.688-4.344-2.064-.944-1.377-1.416-3.689-1.416-6.937zM135.16 563.24c0 3.312-.508 5.64-1.524 6.983-1.017 1.345-2.612 2.017-4.788 2.017-1.12 0-2.216-.12-3.288-.36V554.6a15.064 15.064 0 0 1 3.288-.359c2.192 0 3.792.684 4.8 2.052s1.512 3.683 1.512 6.947zm-1.968 0c0-2.688-.348-4.572-1.044-5.652-.696-1.08-1.796-1.62-3.3-1.62-.528 0-.968.064-1.32.192v14.16c.352.128.792.191 1.32.191 1.04 0 1.86-.195 2.46-.588.6-.392 1.064-1.124 1.392-2.196.328-1.071.492-2.567.492-4.487zM127.888 495.208v5.472h5.952v1.681h-5.952v6.912h6.192V511h-8.16v-17.52h8.16v1.728h-6.192zM128.128 441.36V450h-1.968v-17.52h7.92v1.728h-5.952v5.472h5.712v1.681h-5.712zM132.88 386.96v-6.6h-3.72v-1.681h5.64v9.601c-1.28.64-2.64.96-4.08.96-1.888 0-3.32-.712-4.296-2.137-.976-1.424-1.464-3.711-1.464-6.863 0-3.136.508-5.42 1.524-6.853 1.016-1.432 2.548-2.147 4.596-2.147.944 0 1.984.2 3.12.6v1.849c-1.056-.48-2.097-.721-3.12-.721-1.392 0-2.448.576-3.168 1.729-.72 1.151-1.08 3-1.08 5.544 0 4.848 1.336 7.271 4.008 7.271.72 0 1.4-.184 2.04-.552zM127.36 310.48v7.151h5.184v-7.151h2.016V328h-2.016v-8.64h-5.184V328h-1.92v-17.52h1.92zM133.84 267h-7.68v-1.68h2.832v-14.16h-2.832v-1.68h7.68v1.68h-2.832v14.16h2.832V267zM133.6 188.48v12.96c0 1.76-.348 3-1.044 3.72-.696.72-1.868 1.08-3.516 1.08-1.312 0-2.512-.24-3.6-.721v-2.088c.464.272 1.068.521 1.812.744.744.225 1.34.336 1.788.336.848 0 1.479-.243 1.896-.731.416-.488.624-1.284.624-2.389V190.16h-3.96v-1.68h6z" />
    </g>
  </svg>
)
export default SvgSeat
