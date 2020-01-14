/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

// three.jsで使う各オブジェクトの宣言
var render, scene, camera, light, controls;
var currentModel = 'assetts/MikuMiku.vrm';

//入力するopenposeデータ
var array = [
    [7.54516134791414, -21.768140173180647, -183.4596745057812],
    [-124.5336455982307, 2.415918621530429, -284.8569690566266],
    [-193.02280218024345, -134.14277584172567, -702.8368725045019],
    [-119.88440248193754, 9.72410772056005, -970.9002981473045],
    [154.8486118073826, -45.952199328402315, -334.57519674023166],
    [215.08971510235713, -174.52465049814086, -714.29186443519],
    [166.46238247650444, -23.654825428960223, -983.4563352068009],
    [3.4347934233028363, 63.754926563186196, 133.4556896348461],
    [4.0444335372624645, 92.51847278387943, 380.5741280391957],
    [-23.95490498313763, -6.959973842296878, 587.2537513546404],
    [-59.80226250940439, 52.05215416663249, 664.2835118003845],
    [195.78954304127942, 82.72433860524372, 345.4867843416409],
    [436.04629683883314, 101.85369806885731, 157.6088322373995],
    [467.13680014680523, -35.958118637279526, -188.32700894361506],
    [-182.2795224752419, 127.74897641993233, 369.8786700504398],
    [-398.79876732551367, 27.03427199859532, 338.61811621791105],
    [-514.5184003971674, -116.86618120857737, 524.1660520795907]
];

//配列の要素をx,z,yからx,y,zに入れ替え
for (i = 0; i < array.length; i++) swap(array[i], 1, 2);
//左手系を右手系に変換
for (i = 0; i < array.length; i++)array[i][0] *= -1;

var PoseData = createJsonPose(array);

// ページの読み込みを待ってthree.jsの各初期化を行う
window.onload = () => init();



//swap 関数
function swap(a, x, y) {
        a[x] = [a[y], (a[y] = a[x])][0];
        return a;
    }
//openposeの配列をJson形式(連想配列)に変換
function createJsonPose(array) {
        let jsonPose = {
            "hips": {
                "position": [],
                "rotation": []
            },
            "rightUpperLeg": {
                "position": [],
                "rotation": []
            },
            "rightLowerLeg": {
                "position": [],
                "rotation": []
            },
            "rightFoot": {
                "position": [],
                "rotation": []
            },
            "leftUpperLeg": {
                "position": [],
                "rotation": []
            },
            "leftLowerLeg": {
                "position": [],
                "rotation": []
            },
            "leftFoot": {
                "position": [],
                "rotation": []
            },
            "spine": {
                "position": [],
                "rotation": []
            },
            "chest": {
                "position": [],
                "rotation": []
            },
            "neck": {
                "position": [],
                "rotation": []
            },
            "head": {
                "position": [],
                "rotation": []
            },
            "leftUpperArm": {
                "position": [],
                "rotation": []
            },
            "leftLowerArm": {
                "position": [],
                "rotation": []
            },
            "leftHand": {
                "position": [],
                "rotation": []
            },
            "rightUpperArm": {
                "position": [],
                "rotation": []
            },
            "rightLowerArm": {
                "position": [],
                "rotation": []
            },
            "rightHand": {
                "position": [],
                "rotation": []
            },
        }
        jsonPose.hips.position = array[0];
        jsonPose.rightUpperLeg.position = array[1];
        jsonPose.rightLowerLeg.position = array[2];
        jsonPose.rightFoot.position = array[3];
        jsonPose.leftUpperLeg.position = array[4];
        jsonPose.leftLowerLeg.position = array[5];
        jsonPose.leftFoot.position = array[6];
        jsonPose.spine.position = array[7];
        jsonPose.chest.position = array[8];
        jsonPose.neck.position = array[9];
        jsonPose.head.position = array[10];
        jsonPose.leftUpperArm.position = array[11];
        jsonPose.leftLowerArm.position = array[12];
        jsonPose.leftHand.position = array[13];
        jsonPose.rightUpperArm.position = array[14];
        jsonPose.rightLowerArm.position = array[15];
        jsonPose.rightHand.position = array[16];

        return jsonPose;
    }

//VRMモデルをロードする
function loadVRM(currentModel) {
        let currentVrm = undefined;
        const loader = new THREE.GLTFLoader();
        loader.crossOrigin = 'anonymous';
        loader.load(
            currentModel,
            (gltf) => {
                THREE.VRM.from(gltf).then((vrm) => {
                    scene.add(vrm.scene);
                    console.log(vrm);

                    // VRMモデルにPoseData(Json形式)のボーンデータを設定
                    // THREE.VRM.from(gltf).then((vrm)=>{
                    //     vrm.humanoid.setPose(PoseData);
                    // })
                });
            },
            (progress) => console.log('Loading moddel...', 100 * (progress.loaded / progress.total), '%'),
            (error) => console.error(error)
        );
    }
//Three.jsの初期化関数
function init() {
        //create renderer
        renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#model_preview'),
            preserveDrawingBuffer: true,
        });

        // retina対応
        renderer.setPixelRatio(window.devicePixelRatio);
        let width = document.getElementById('model_preview').clientWidth;
        let height = document.getElementById('model_preview').clientHeight;
        renderer.setSize(width, height);

        //renderer.setPixelRatio(window.devicePixelRatio);
        //create scene
        scene = new THREE.Scene();

        //create cam
        camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 20.0);
        camera.position.set(0, 1, 5);

        //light
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1.0, 1.0, 1.0).normalize();
        scene.add(light);

        //camera controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.screenSpacePanning = true;
        controls.target.set(0.0, 1.0, 0.0);
        controls.update();

        //VRMを読み込む
        loadVRM(currentModel);

        //helpers
        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);

        //軸を表示
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        animate();
    }

//アニメーションを行う関数
function animate() {
        requestAnimationFrame(animate);
        render();
    }

function render() {
        renderer.render(scene, camera);
    }