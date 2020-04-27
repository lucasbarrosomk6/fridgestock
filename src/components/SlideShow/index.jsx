import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer,
} from "mdbreact";
import firstSlide from "assets/firstSlide.jpg";
import secondSlide from "assets/2ndSlide.jpg";
import thirdSlide from "assets/3rdSlide.jpg";
const SlideShowItem = ({ title, tagline, background }) => (
  <div>
    <h1 style={{ paddingLeft: "10px", background: "	rgb(255, 255, 255, .3)" }}>
      <strong>{title}</strong>
    </h1>
    <p
      style={{
        paddingLeft: "10px",
        background: "	rgb(255, 255, 255, .3)",
      }}
    >
      <strong>{tagline}</strong>
    </p>
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        zIndex: "-1",
        top: "0",
        height: "100%",
      }}
    >
      <img
        src={background}
        alt="slide background"
        style={{
          width: "100%",
          height: "auto",
          position: "center",
          opacity: ".8",
          filter: "blur(1px) brightness(1.4)",
        }}
      />
    </div>
  </div>
);

const SlideShow = () => {
  return (
    <MDBContainer style={{ padding: "5px 0" }}>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={false}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <SlideShowItem
                title="FridgeStock"
                tagline="Get recipes that work with what you have"
                background={firstSlide}
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <SlideShowItem
                title="Add Ingredients"
                tagline="In the input down below"
                background={secondSlide}
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <SlideShowItem
                title="Choose"
                tagline="Your perfect recipe"
                background={thirdSlide}
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default SlideShow;
