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




// ------ Outro exemplo ------
// Tomada Adapter


interface Tomada {
  pinos: number;
  plugar(tomada: Tomada): boolean;
}

class TomadaPlugavel implements Tomada {
  constructor(public pinos: number) {}

  plugar(tomada: Tomada) {
    return this.pinos === tomada.pinos;
  }
}

class TomadaAdapter implements Tomada {
  pinos: number;
  constructor(private tomada: Tomada) {
    this.pinos = tomada.pinos;
  }
  plugar(tomada: Tomada): boolean {
    this.pinos = tomada.pinos
    return tomada.plugar(this);
  }
}

const tomadaBR = new TomadaPlugavel(2);
const tomadaEUA = new TomadaPlugavel(3);
const tomadaEUAAdaptadaParaBR = new TomadaAdapter(tomadaEUA);

function teste(tomada1: Tomada, tomada2: Tomada, descricao: string) {
  const plugou = tomada1.plugar(tomada2);
  if (plugou) {
    console.log(`TUDO OK, Quantidade de pinos: ${tomada1.pinos}. (${descricao})`);
  } else {
    console.log(`Tomadas incompatíveis. Tomada1: ${tomada1.pinos} pinos, Tomada2: ${tomada2.pinos} pinos. (${descricao})`);
  }
}

teste(tomadaBR, tomadaBR, 'Tomadas iguais');
teste(tomadaBR, tomadaEUA, 'Tomadas diferentes');
teste(tomadaEUA, tomadaBR, 'Tomadas diferentes');
teste(tomadaEUAAdaptadaParaBR, tomadaBR, 'Tomadas diferentes adaptadas');

// TUDO OK, Quantidade de pinos: 2. (Tomadas iguais)
// Tomadas incompatíveis. Tomada1: 2 pinos, Tomada2: 3 pinos. (Tomadas diferentes)
// Tomadas incompatíveis. Tomada1: 3 pinos, Tomada2: 2 pinos. (Tomadas diferentes)
// TUDO OK, Quantidade de pinos: 2. (Tomadas diferentes adaptadas)
