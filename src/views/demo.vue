<!--import React, {useState, useEffect} from 'react';-->
<!--import ReactDom from 'react-dom';-->

<!--const RedEnvelope = function () {-->
<!--const redEnvelopeList = Array.from(new Array(30));-->
<!--const [maxLeft, setMaxLeft] = useState(0);-->

<!--useEffect(() => {-->
<!--setMaxLeft(document.body.offsetWidth);-->
<!--}, []);-->

<!--return (-->
<!--<>-->
<!--{-->
<!--redEnvelopeList.map((item, index) => {-->
<!--return (-->
<!--<img-->
<!--    className="img"-->
<!--    src="https://mpics.bdstatic.com/pc-live/red-envelope.png"-->
<!--    style={{-->
<!--    left: `${Math.random() * maxLeft}px`,-->
<!--    animationDuration: `${Math.random() * 3 + 1}s`-->
<!--    }}-->
<!--    key={index}-->
<!--/>-->
<!--);-->
<!--})-->
<!--}-->
<!--</>-->
<!--);-->
<!--};-->

<!--ReactDom.render(<RedEnvelope />, document.getElementById('app'));-->
