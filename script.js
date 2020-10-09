import { log, square } from "./module.js";
import * as THREE from "./three.js";
import * as dat from "./dat.gui.js";
const obj = { a: 1, b: 2, c: 3 };

//onst {a,b,c} = obj
//onsole.log(num)

log(obj, "a");
var rotation = 0.0;
console.log(square(5));

const app = {
  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera();
    this.camera.position.z = 50;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    this.createLights();
    this.knot = this.createKnot();

    this.createGUI();

    this.render = this.render.bind(this);
    this.render();
  },
  createGUI() {
    this.gui = new dat.GUI();

    this.gui.add(this.knot.scale, "x", 0.1, 2);
    this.gui.add(this.knot.scale, "y", 0.1, 2);
    this.gui.add(this.knot.scale, "z", 0.1, 2);

    //this.gui.add( this.setAxisAngleFromRotationMatrix, 'w', 0.1, 1)
    //this.gui.add( this.knot.rotation, 'x', 0.1, 1)
  },
  createLights() {
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.z = 180;

    this.scene.add(pointLight);
  },
  createKnot() {
    const knotgeo = new THREE.TorusKnotGeometry(10, 0.1, 128, 16, 5, 21);
    const mat = new THREE.MeshPhongMaterial({
      color: 0xff8080,
      shininess: 280
    });
    const knot = new THREE.Mesh(knotgeo, mat);

    this.scene.add(knot);

    //make gui that controls rotation of knot
    this.gui = new dat.GUI();
    const controller = {};
    let value = 0;
    Object.defineProperty(controller, "rotation.x", {
      get() {
        return value;
      },
      set(v) {
        value = v;
        knot.rotation.x = value;
      }
    });
    Object.defineProperty(controller, "rotation.y", {
      get() {
        return value;
      },
      set(v) {
        value = v;
        knot.rotation.y = value;
      }
    });
    Object.defineProperty(controller, "rotation.z", {
      get() {
        return value;
      },
      set(v) {
        value = v;
        knot.rotation.z = value;
      }
    });
    this.gui.add(controller, "rotation.x", 0.01, 360);
    this.gui.add(controller, "rotation.y", 0.01, 360);
    this.gui.add(controller, "rotation.z", 0.01, 360);

    controller.knot = this.knot;

    return knot;
  },
  render() {
    this.knot.rotation.x += 0.2;
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render);
  }
};
window.onload = () => app.init();
