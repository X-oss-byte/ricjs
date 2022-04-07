import RICConnector from "../../src/RICConnector";

const RICServiceUUID = 'aa76677e-9cfd-4626-a510-0d305be57c8d';

declare global {
    var ricConnector: RICConnector;
}

async function getBleDevice(): Promise<BluetoothDevice | null> {
    try {
      const dev = await navigator.bluetooth.requestDevice({
        filters: [
          { services: [RICServiceUUID] }
        ],
        optionalServices: []
      });
      return dev;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

export async function connectBLE(params: Array<string>): Promise<void> {
    const dev = await getBleDevice();
    if (await globalThis.ricConnector.connect("WebBLE", dev)) {
        console.log("connectBLE - connected to device " + dev.name);
    } else {
        console.log("connectBLE - failed to connect");
        return;
    }
}

export async function disconnect(params: Array<string>): Promise<void> {
    globalThis.ricConnector.disconnect();
}

export async function connectWiFi(params: Array<string>): Promise<void> {
  const wifiIP = document.getElementById("wifi-ip") as HTMLInputElement;
  const wifiPw = document.getElementById("wifi-pw") as HTMLInputElement;
  const wifiIPAddr = wifiIP.value;
  const wifiPwStr = wifiPw.value;
  globalThis.ricConnector.connect("WiFi", wifiIPAddr);
}

export async function startCheckCorrectRIC(params: Array<string>): Promise<void> {
  const availableColours = [
    { led: "#202000", lcd: "#FFFF00" },
    { led: "#880000", lcd: "#FF0000" },
    { led: "#000040", lcd: "#0080FF" },
  ];

  // Set the colours to display on LEDs
  globalThis.ricConnector.checkCorrectRICStart(availableColours);
}

export async function acceptCheckCorrectRIC(params: Array<string>): Promise<void> {
  globalThis.ricConnector.checkCorrectRICStop(true);
}

export async function rejectCheckCorrectRIC(params: Array<string>): Promise<void> {
  globalThis.ricConnector.checkCorrectRICStop(false);
}
