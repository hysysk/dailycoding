window.addEventListener("load", () => {
  navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      const inputSelector = document.querySelector("#cameras");
      const video = document.querySelector("video");

      inputSelector.addEventListener("change", (e) => {
        const selectedId = e.target.value;
        if (selectedId) {
          const constraints = {
            audio: false,
            video: { deviceId: selectedId }
          };

          navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
              video.srcObject = stream;
            })
            .catch((err) => {
              console.error(`${err.name}: ${err.message}`);
            });
        } else {
          video.srcObject = null;
        }
      });

      video.addEventListener("loadedmetadata", () => {
        video.play();
        console.log(video.clientWidth, video.clientHeight);
      });

      devices.forEach((device) => {
        if (device.kind === "videoinput") {
          if (device.deviceId) {
            console.log(device.label, device.deviceId);
            const opt = document.createElement("option");
            opt.value = device.deviceId;
            opt.text = device.label;
            inputSelector.add(opt);
          } else {
            const p = document.createElement("p");
            p.appendChild(document.createTextNode("Couldn't get the device ID"));
            document.body.appendChild(p);
          }
        }
      })
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    });
});