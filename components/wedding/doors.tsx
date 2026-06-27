"use client"

// import { useState, useEffect } from "react"
import Image from "next/image"

export function Doors() {
  return (
    <>
      <div className="door-wrapper hide-on-scroll">
        <div className="wrapper">
          <div id="left-door" className="door">
            <Image src="/images/left-door.png" loading="eager" fill alt="Door front" />
          </div>
          <div id="right-door" className="door">
            <Image src="/images/right-door.png" loading="eager" fill alt="Door back" />
          </div>
        </div>
      </div>
      <style jsx>{`

.door-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 51;
}

.wrapper {
/*   height: 300px;
  width: 250px; */
  height: 100%;
  width: 100%;
  position: relative;
  /* 3D */
  perspective: 1000px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.door {
  background-color: #e1c4bc;
  height: 100%;
  width: 50%;
  position: absolute;
  /* inner layout */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

#left-door {
  top: 0;
  left: 0;
  /* transition */
  transform: rotateright;
  transform-origin: left;
  transition: transform 5s;
  img {
    transform: scaleX(-1);
  }
}

#right-door {
  top: 0;
  right: 0;
  /* transition */
  transform-origin: right;
  transition: transform 5s;
}

.shape {
  border: 4px solid black;
  width: 100px;
  height: 130px;
}

// /* Door swing effect */
// .wrapper:hover #left-door{
//     -webkit-transform: rotateY(131deg);
//     transform: rotateY(131deg);
// }

// .wrapper:hover #right-door{
//     -webkit-transform: rotateY(-131deg);
//     transform: rotateY(-131deg);
// }

/* Door swing effect */
.wrapper #left-door{
  animation: open-left 10s;
  animation-fill-mode: forwards;
}

.wrapper #right-door{
  animation: open-right 10s;
  animation-fill-mode: forwards;
}


@-webkit-keyframes open-left {
  0%, 20%, 30%{
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateY(131deg);
    transform: rotateY(131deg);
  }

  100% {
    -webkit-transform: rotateY(131deg);
    transform: rotateY(131deg);
  }
}

@keyframes open-right {
  0%, 20%, 30%{
    -webkit-transform: rotateY(-0deg);
    transform: rotateY(-0deg);
  }
  50% {
    -webkit-transform: rotateY(-131deg);
    transform: rotateY(-131deg);
  }

  100% {
    -webkit-transform: rotateY(-131deg);
    transform: rotateY(-131deg);
  }
}

/* Define the keyframes to hide the component */
@keyframes fadeAndHide {
  to {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-100%); /* Optional: slides it up out of view */
  }
}

/* Apply to your sticky or fixed component */
.hide-on-scroll {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  
  /* Link animation to the vertical page scroll */
  animation: fadeAndHide linear both;
  animation-timeline: scroll(root block);
  
  /* Optional: Adjust range if you want it to hide within a specific scroll distance */
  animation-range: 0px 200px; 
}

`}</style>
    </>

  )
}
