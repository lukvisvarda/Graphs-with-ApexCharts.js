class MySlider extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "wrapper");

    const slider = wrapper.appendChild(document.createElement("input"));
    slider.setAttribute("class", "slider");
    slider.setAttribute("id", "slider");
    slider.setAttribute("type", "range");

    let minVal = this.hasAttribute("min-val")
      ? this.getAttribute("min-val")
      : "1";
    let maxVal = this.hasAttribute("max-val")
      ? this.getAttribute("max-val")
      : "5";

    slider.setAttribute("min", minVal);
    slider.setAttribute("max", maxVal);
    slider.setAttribute("value", minVal);

    const sliderV = wrapper.appendChild(document.createElement("span"));
    sliderV.setAttribute("class", "sliderV");
    sliderV.setAttribute("value", minVal);

    const ampInput = wrapper.appendChild(document.createElement("input"));
    ampInput.setAttribute("id", "inp");
    ampInput.setAttribute("type", "number");

    ampInput.setAttribute("min", minVal);
    ampInput.setAttribute("max", maxVal);
    ampInput.setAttribute("value", slider.value);

    ampInput.hidden = true;

    const style = document.createElement("style");
    style.textContent = `
      .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .slider { 
        width: 100%;
        background: linear-gradient(to right, #6b8dff 0%, #ff2a5f 0%, #fff 0%, #fff 100%);
        height: 13px;
        transition: background 450ms ease-in;
        -webkit-appearance: none;
        border: solid #D3D3D3;
        border-radius: 0.25rem;
      }
      .slider::-webkit-slider-thumb {
        cursor: grab;
        appearance: none;
        height: 1.5rem;
        width: 3rem;
        background-color: #F0F0F0;
        border-radius: 0.25rem;
        border: solid #C8C8C8;
      }
      .sliderV {
        
        position: absolute;
        /* half :thumb width */
        top: 0;
        width: 1px;
        /* same as :thumb */
        height: 1.5rem;
        /* same as :thumb */
        text-align: center;
        line-height: 18px;
        font-size: 12px;
        pointer-events: none
      }

      .sliderV::before {
        content: attr(data-val) " ";
      }

      #inp {
        width: 8rem;
        background-color: #F0F0F0;
        border: solid #C8C8C8;
        border-radius: 0.25rem;
        height: 1.125rem;
      }
      `;

    this.shadowRoot.append(style, wrapper);

    this.clickEventFunc = (event) => {
      const customEvent = new CustomEvent("click-slider", {
        bubbles: true,
        composed: true,
        detail: { value: event.target.value },
      });
      ampInput.value = event.target.value;
      this.dispatchEvent(customEvent);
    };

    this.updateAmpFunc = (event) => {
      const customEvent2 = new CustomEvent("update-amp", {
        bubbles: true,
        composed: true,
        detail: { value: event.target.value },
      });
      slider.value = event.target.value;
      this.dispatchEvent(customEvent2);
    };

    this.shadowRoot
      .querySelector("#inp")
      .addEventListener("change", this.updateAmpFunc);

    this.shadowRoot
      .querySelector("#slider")
      .addEventListener("click", this.clickEventFunc);
  }
}
