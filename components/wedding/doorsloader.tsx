"use client"
import Image from "next/image"

export function DoorsLoader() {
  return (
    <>
      <div className="door-wrapper">
        <div className="wrapper">
          <div id="left-door" className="door">
            <Image src="/images/wedding_door2.png" priority fill alt="Door front" />
          </div>
          {/* <div id="left-door" className="door">
            <Image src="/images/left-door.png" priority fill alt="Door front" />
          </div>
          <div id="right-door" className="door">
            <Image src="/images/right-door.png" priority fill alt="Door back" />
          </div> */}
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
  // width: 50%;
  width: 100%;
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
  img {
    transform: scaleX(-1);
  }
}

#right-door {
  top: 0;
  right: 0;
}

.shape {
  border: 4px solid black;
  width: 100px;
  height: 130px;
}
`}</style>
    </>

  )
}
