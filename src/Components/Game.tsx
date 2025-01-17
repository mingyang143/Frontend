// import { UnityInstance } from "react-unity-webgl/declarations/unity-instance";

// export default function Game() {
//   // const { unityProvider } = useUnityContext({
//   //   loaderUrl: "../../public/Build/BuildUnity.loader.js",
//   //   dataUrl: "../../public/Build/BuildUnity.data",
//   //   frameworkUrl: "../../public/Build/BuildUnity.framework.js",
//   //   codeUrl: "../../public/Build/BuildUnity.wasm",
//   // });
//   var container = document.querySelector("#unityBuild-container");
//   var canvas = document.querySelector("#unity-canvas");
//   var loadingBar = document.querySelector("#unity-loading-bar");
//   var progressBarFull = document.querySelector("#unity-progress-bar-full");
//   var fullscreenButton = document.querySelector("#unity-fullscreen-button");
//   var warningBanner = document.querySelector("#unity-warning");
//   function unityShowBanner(msg: string, type: string) {
//     function updateBannerVisibility() {
//       warningBanner?.setAttribute(
//         "style",
//         `display:${warningBanner?.children.length ? "block" : "none"};`
//       );
//     }
//     var div = document.createElement("div");
//     div.innerHTML = msg;
//     warningBanner?.appendChild(div);
//     if (type == "error")
//       div.setAttribute("style", "background: red; padding: 10px;");
//     else {
//       if (type == "warning")
//         div.setAttribute("style", "background: yellow; padding: 10px;");
//       setTimeout(function () {
//         warningBanner?.removeChild(div);
//         updateBannerVisibility();
//       }, 5000);
//     }
//     updateBannerVisibility();
//   }

//   var buildUrl = "public/Build";
//   var loaderUrl = buildUrl + "/BuildUnity.loader.js";
//   var config = {
//     dataUrl: buildUrl + "/BuildUnity.data.br",
//     frameworkUrl: buildUrl + "/BuildUnity.framework.js.br",
//     codeUrl: buildUrl + "/BuildUnity.wasm.br",
//     streamingAssetsUrl: "StreamingAssets",
//     companyName: "DefaultCompany",
//     productName: "Producity",
//     productVersion: "0.1.0",
//     showBanner: unityShowBanner,
//   };

//   // By default, Unity keeps WebGL canvas render target size matched with
//   // the DOM size of the canvas element (scaled by window.devicePixelRatio)
//   // Set this to false if you want to decouple this synchronization from
//   // happening inside the engine, and you would instead like to size up
//   // the canvas DOM size and WebGL render target sizes yourself.
//   // config.matchWebGLToCanvasSize = false;

//   if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
//     // Mobile device style: fill the whole browser client area with the game canvas:

//     var meta = document.createElement("meta");
//     meta.name = "viewport";
//     meta.content =
//       "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes";
//     document.getElementsByTagName("head")[0].appendChild(meta);
//     container?.classList.add("unity-mobile");

//     canvas?.classList.add("unity-mobile");

//     // To lower canvas resolution on mobile devices to gain some
//     // performance, uncomment the following line:
//     // config.devicePixelRatio = 1;
//   } else {
//     // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:
//     canvas?.setAttribute("style", "width:960px; height:600px");
//   }

//   loadingBar?.setAttribute("style", "display:block;");

//   var script = document.createElement("script");
//   script.src = loaderUrl;
//   script.onload = () => {
//     window
//       .createUnityInstance(canvas, config, (progress: number) => {
//         progressBarFull?.setAttribute("style", `width: ${100 * progress}%`);
//       })
//       .then((unityInstance: UnityInstance) => {
//         loadingBar?.setAttribute("style", "display:none;");
//         fullscreenButton?.addEventListener("click", () => {
//           unityInstance.SetFullscreen(1);
//         });
//       })
//       .catch((message: string) => {
//         alert(message);
//       });
//   };

//   document.body.appendChild(script);

//   return (
//     <div id="unity-container" className="unity-desktop">
//       <canvas id="unity-canvas" width="960" height="600" tabIndex={-1}></canvas>
//       <div id="unity-loading-bar">
//         <div id="unity-logo"></div>
//         <div id="unity-progress-bar-empty">
//           <div id="unity-progress-bar-full"></div>
//         </div>
//       </div>
//       <div id="unity-warning"></div>
//       <div id="unity-footer">
//         <div id="unity-webgl-logo"></div>
//         <div id="unity-fullscreen-button"></div>
//         <div id="unity-build-title">
//           Click the app button on the navigation to view your city!
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect } from "react";

// Extend the global Window interface
declare global {
  interface Window {
    createUnityInstance: any;
  }
}

export default function Game() {
  useEffect(() => {
    const container = document.querySelector("#unityBuild-container");
    const canvas = document.querySelector("#unity-canvas");
    const loadingBar = document.querySelector("#unity-loading-bar");
    const progressBarFull = document.querySelector("#unity-progress-bar-full");
    const fullscreenButton = document.querySelector("#unity-fullscreen-button");
    const warningBanner = document.querySelector("#unity-warning");

    function unityShowBanner(msg: string, type: string) {
      function updateBannerVisibility() {
        warningBanner?.setAttribute(
          "style",
          `display:${warningBanner?.children.length ? "block" : "none"};`
        );
      }
      const div = document.createElement("div");
      div.innerHTML = msg;
      warningBanner?.appendChild(div);
      if (type === "error") {
        div.setAttribute("style", "background: red; padding: 10px;");
      } else {
        if (type === "warning") {
          div.setAttribute("style", "background: yellow; padding: 10px;");
        }
        setTimeout(() => {
          warningBanner?.removeChild(div);
          updateBannerVisibility();
        }, 5000);
      }
      updateBannerVisibility();
    }

    const buildUrl = "Build";
    const loaderUrl = `${buildUrl}/BuildUnity.loader.js`;
    const config = {
      dataUrl: `${buildUrl}/BuildUnity.data.br`,
      frameworkUrl: `${buildUrl}/BuildUnity.framework.js.br`,
      codeUrl: `${buildUrl}/BuildUnity.wasm.br`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "Producity",
      productVersion: "0.1.0",
      showBanner: unityShowBanner,
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content =
        "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes";
      document.getElementsByTagName("head")[0].appendChild(meta);
      container?.classList.add("unity-mobile");
      canvas?.classList.add("unity-mobile");
    } else {
      canvas?.setAttribute("style", "width:960px; height:600px");
    }

    loadingBar?.setAttribute("style", "display:block;");

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      window
        .createUnityInstance(canvas, config, (progress: number) => {
          progressBarFull?.setAttribute("style", `width: ${100 * progress}%`);
        })
        .then((unityInstance: any) => {
          loadingBar?.setAttribute("style", "display:none;");
          fullscreenButton?.addEventListener("click", () => {
            unityInstance.SetFullscreen(1);
          });
        })
        .catch((message: string) => {
          alert(message);
        });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div id="unity-container" className="unity-desktop">
      <canvas id="unity-canvas" width="960" height="600" tabIndex={-1}></canvas>
      <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>
      <div id="unity-warning"></div>
      <div id="unity-footer">
        <div id="unity-webgl-logo"></div>
        <div id="unity-fullscreen-button"> full screen</div>
        <div id="unity-build-title">
          Click the app button on the navigation to view your city!
        </div>
      </div>
    </div>
  );
}
