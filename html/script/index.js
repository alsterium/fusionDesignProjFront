/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

// three.jsで使う各オブジェクトの宣言
var render, scene, camera, light, controls;
var currentModel = "assetts/AliciaSolid.vrm";

//入力するopenposeデータ
var openPoseDataArray = [
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

// ページの読み込みを待ってthree.jsの各初期化を行う
window.onload = () => init();

//swap 関数
function swap(a, x, y) {
  a[x] = [a[y], (a[y] = a[x])][0];
  return a;
}
//openposeの配列をJson形式(連想配列)に変換
function createJsonPose() {
  let jsonPose = {
    hips: {
      rotation: []
    },
    rightUpperLeg: {
      rotation: []
    },
    rightLowerLeg: {
      rotation: []
    },
    rightFoot: {
      rotation: []
    },
    leftUpperLeg: {
      rotation: []
    },
    leftLowerLeg: {
      rotation: []
    },
    leftFoot: {
      rotation: []
    },
    spine: {
      rotation: []
    },
    chest: {
      rotation: []
    },
    neck: {
      rotation: []
    },
    head: {
      rotation: []
    },
    leftUpperArm: {
      rotation: []
    },
    leftLowerArm: {
      rotation: []
    },
    leftHand: {
      rotation: []
    },
    rightUpperArm: {
      rotation: []
    },
    rightLowerArm: {
      rotation: []
    },
    rightHand: {
      rotation: []
    }
  };
  return jsonPose;
}
function setPoseFromQuarternion(QuatArray) {
  let Pose = createJsonPose();

  Pose.rightUpperLeg.rotation = QuatArray[1];
  Pose.rightLowerLeg.rotation = QuatArray[2];
  Pose.leftUpperLeg.rotation = QuatArray[4];
  Pose.leftLowerLeg.rotation = QuatArray[5];
  Pose.spine.rotation = QuatArray[7];
  Pose.chest.rotation = QuatArray[8];
  Pose.neck.rotation = QuatArray[9];
  Pose.leftUpperArm.rotation = QuatArray[11];
  Pose.leftLowerArm.rotation = QuatArray[12];
  Pose.rightUpperArm.rotation = QuatArray[14];
  Pose.rightLowerArm.rotation = QuatArray[15];

  return Pose;
}

// 入力されたボーンの単位ベクトルを求める

function computeUnit(bonesArray) {
  // console.log(bonesArray);
  let NormVec = new Array();
  NormVec[0] = new THREE.Vector3(
    bonesArray[1][0] - bonesArray[0][0],
    bonesArray[1][1] - bonesArray[0][1],
    bonesArray[1][2] - bonesArray[0][2]
  ).normalize(); // rightUpperLeg
  NormVec[1] = new THREE.Vector3(
    bonesArray[2][0] - bonesArray[1][0],
    bonesArray[2][1] - bonesArray[1][1],
    bonesArray[2][2] - bonesArray[1][2]
  ).normalize(); // rightLowerLeg
  NormVec[2] = new THREE.Vector3(
    bonesArray[3][0] - bonesArray[2][0],
    bonesArray[3][1] - bonesArray[2][1],
    bonesArray[3][2] - bonesArray[2][2]
  ).normalize(); // rightFoot
  NormVec[3] = new THREE.Vector3(
    bonesArray[4][0] - bonesArray[0][0],
    bonesArray[4][1] - bonesArray[0][1],
    bonesArray[4][2] - bonesArray[0][2]
  ).normalize(); // leftUpperLeg
  NormVec[4] = new THREE.Vector3(
    bonesArray[5][0] - bonesArray[4][0],
    bonesArray[5][1] - bonesArray[4][1],
    bonesArray[5][2] - bonesArray[4][2]
  ).normalize(); // leftLowerLeg
  NormVec[5] = new THREE.Vector3(
    bonesArray[6][0] - bonesArray[5][0],
    bonesArray[6][1] - bonesArray[5][1],
    bonesArray[6][2] - bonesArray[5][2]
  ).normalize(); // leftFoot
  NormVec[6] = new THREE.Vector3(
    bonesArray[7][0] - bonesArray[0][0],
    bonesArray[7][1] - bonesArray[0][1],
    bonesArray[7][2] - bonesArray[0][2]
  ).normalize(); // spine
  NormVec[7] = new THREE.Vector3(
    bonesArray[8][0] - bonesArray[7][0],
    bonesArray[8][1] - bonesArray[7][1],
    bonesArray[8][2] - bonesArray[7][2]
  ).normalize(); // chest
  NormVec[8] = new THREE.Vector3(
    bonesArray[9][0] - bonesArray[8][0],
    bonesArray[9][1] - bonesArray[8][1],
    bonesArray[9][2] - bonesArray[8][2]
  ).normalize(); // neck
  NormVec[9] = new THREE.Vector3(
    bonesArray[10][0] - bonesArray[9][0],
    bonesArray[10][1] - bonesArray[9][1],
    bonesArray[10][2] - bonesArray[9][2]
  ).normalize(); // head
  NormVec[10] = new THREE.Vector3(
    bonesArray[11][0] - bonesArray[9][0],
    bonesArray[11][1] - bonesArray[9][1],
    bonesArray[11][2] - bonesArray[9][2]
  ).normalize(); // leftUpperArm
  NormVec[11] = new THREE.Vector3(
    bonesArray[12][0] - bonesArray[11][0],
    bonesArray[12][1] - bonesArray[11][1],
    bonesArray[12][2] - bonesArray[11][2]
  ).normalize(); // leftLowerArm
  NormVec[12] = new THREE.Vector3(
    bonesArray[13][0] - bonesArray[12][0],
    bonesArray[13][1] - bonesArray[12][1],
    bonesArray[13][2] - bonesArray[12][2]
  ).normalize(); // leftHand
  NormVec[13] = new THREE.Vector3(
    bonesArray[14][0] - bonesArray[9][0],
    bonesArray[14][1] - bonesArray[9][1],
    bonesArray[14][2] - bonesArray[9][2]
  ).normalize(); // rightUpperArm
  NormVec[14] = new THREE.Vector3(
    bonesArray[15][0] - bonesArray[14][0],
    bonesArray[15][1] - bonesArray[14][1],
    bonesArray[15][2] - bonesArray[14][2]
  ).normalize(); // rightLowerArm
  NormVec[15] = new THREE.Vector3(
    bonesArray[16][0] - bonesArray[15][0],
    bonesArray[16][1] - bonesArray[15][1],
    bonesArray[16][2] - bonesArray[15][2]
  ).normalize(); // rightHand

  return NormVec;
}

function computeVector(vrm) {
  let vrmVector = new Array();
  vrmVector[0] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg)
      .position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position
        .x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg)
      .position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position
        .y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg)
      .position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.z
  ).normalize();
  vrmVector[1] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg)
      .position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg)
        .position.x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg)
      .position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg)
        .position.y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg)
      .position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg)
        .position.z
  ).normalize();
  vrmVector[2] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightFoot)
      .position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg)
        .position.x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightFoot)
      .position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg)
        .position.y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightFoot)
      .position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg)
        .position.z
  ).normalize();
  vrmVector[3] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg)
      .position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position
        .x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg)
      .position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position
        .y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg)
      .position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.z
  ).normalize();
  vrmVector[4] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg)
      .position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg)
        .position.x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg)
      .position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg)
        .position.y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg)
      .position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg)
        .position.z
  ).normalize();
  vrmVector[5] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftFoot).position
      .x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg)
        .position.x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftFoot).position
      .y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg)
        .position.y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftFoot).position
      .z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg)
        .position.z
  ).normalize();
  vrmVector[6] = new THREE.Vector3(
    -vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position
      .x +
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position
        .x,
    -vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position
      .y +
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position
        .y,
    -vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position
      .z +
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.z
  ).normalize(); //ここ本当に謎
  vrmVector[7] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position
      .x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position
        .x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position
      .y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position
        .y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position
      .z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position
        .z
  ).normalize();
  vrmVector[8] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position
        .x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position
        .y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position
        .z
  ).normalize();
  vrmVector[9] = new THREE.Vector3(
    -vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position
      .x +
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position
        .x,
    -vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position
      .y +
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position
        .y,
    -vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position
      .z +
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z
  ).normalize(); //ここも謎
  vrmVector[10] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm)
      .position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position
        .x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm)
      .position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position
        .y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm)
      .position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z
  ).normalize();
  vrmVector[11] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm)
      .position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm)
        .position.x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm)
      .position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm)
        .position.y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm)
      .position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm)
        .position.z
  ).normalize();
  vrmVector[12] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand).position
      .x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm)
        .position.x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand).position
      .y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm)
        .position.y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand).position
      .z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm)
        .position.z
  ).normalize();
  vrmVector[13] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm)
      .position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position
        .x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm)
      .position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position
        .y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm)
      .position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z
  ).normalize();
  vrmVector[14] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm)
      .position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm)
        .position.x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm)
      .position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm)
        .position.y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm)
      .position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm)
        .position.z
  ).normalize();
  vrmVector[15] = new THREE.Vector3(
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand)
      .position.x -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm)
        .position.x,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand)
      .position.y -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm)
        .position.y,
    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand)
      .position.z -
      vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm)
        .position.z
  ).normalize();
  /*vrmVector[16] = new THREE.Vector3(
                    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.x,
                    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.y,
                    vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z
                ).length();*/

  return vrmVector;
}

function calcquaternion(normvec, vrmVector) {
  var up = vrmVector;

  var normalAxis = normvec;

  var q = new THREE.Quaternion();

  return q.setFromUnitVectors(up, normalAxis);
}

function convertPose(OpenPoseData, VRM) {
  //配列の要素をx,z,yからx,y,zに入れ替え
  for (i = 0; i < OpenPoseData.length; i++) swap(OpenPoseData[i], 1, 2);
  //左手系を右手系に変換
  for (i = 0; i < OpenPoseData.length; i++) OpenPoseData[i][0] *= -1;

  let normVec = computeUnit(OpenPoseData);
  let vrmNormVec = computeVector(VRM);
  let quat = new THREE.Quaternion();
  for (let i = 0; i < normVec.length; i++)
    quat[i] = calcquaternion(normVec[i], vrmNormVec[i]);
  return setPoseFromQuarternion(quat);
}

//VRMモデルをロードする
function loadVRM(currentModel) {
  let currentVrm = undefined;
  const loader = new THREE.GLTFLoader();
  loader.crossOrigin = "anonymous";
  loader.load(
    currentModel,
    gltf => {
      THREE.VRM.from(gltf).then(vrm => {
        scene.add(vrm.scene);
        console.log(vrm);
        // VRMモデルにPoseData(Json形式)のボーンデータを設定
        THREE.VRM.from(gltf).then(vrm => {
          let pose = convertPose(openPoseDataArray, vrm);
          console.log(pose);
          vrm.humanoid.setPose(pose);
          console.log(vrm);
        });
      });
    },
    progress =>
      console.log(
        "Loading moddel...",
        100 * (progress.loaded / progress.total),
        "%"
      ),
    error => console.error(error)
  );
}
//Three.jsの初期化関数
function init() {
  //create renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#model_preview"),
    preserveDrawingBuffer: true
  });

  // retina対応
  renderer.setPixelRatio(window.devicePixelRatio);
  let width = document.getElementById("model_preview").clientWidth;
  let height = document.getElementById("model_preview").clientHeight;
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
