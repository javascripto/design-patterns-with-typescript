interface IPhone {
  useLightning();
}

interface Android {
  useMicroUSB();
}

class IPhone7 implements IPhone {
  useLightning() {
    console.log('Usando porta Lightning...');
  }
}

class GooglePixel implements Android {
  useMicroUSB() {
    console.log('Usando porta micro USB');
  }
}

/**
 * @class LightningToMicroUSBAdapter funciona como um adaptador
 * onde uma classe pode utilizar metodos de outra ao envolve-la
 * numa classe que segue o padrão adapter
 */
class LightningToMicroUSBAdapter implements Android {
  iphoneDevice: IPhone;

  constructor(iphone: IPhone) {
    this.iphoneDevice = iphone;
  }

  public useMicroUSB() {
    console.log('Quero usar microUSB, convertendo para Lightning...');
    this.iphoneDevice.useLightning();
  }
}

const iphone = new IPhone7();
const chargeAdapter = new LightningToMicroUSBAdapter(iphone);

// Iphone invocando método de carregamento do um dspositivo android
chargeAdapter.useMicroUSB();
