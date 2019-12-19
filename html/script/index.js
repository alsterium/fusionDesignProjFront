/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style


// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {


    let array = [
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

    console.log(array);

    // for (i = 0; i < array[0].length; i++)
    //     array[0][i] *= 0.001;

    // for (i = 1; i < array.length; i++) {
    //     for (j = 0; j < array[i].length; j++)
    //         switch (j) {
    //             case 0:
    //                 array[i][j] *= 1.0;
    //                 break;
    //             case 1:
    //                 array[i][j] *= 1.0;
    //                 break;
    //             case 2:
    //                 array[i][j] *= 1.0;
    //                 break;
    //             default:break;
    //         }
    // }
    //create renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#model_preview'),
        preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);

    let width = document.getElementById('model_preview').clientWidth;
    let height = document.getElementById('model_preview').clientHeight;

    console.log(width);

    renderer.setSize(width, height);
    //renderer.setPixelRatio(window.devicePixelRatio);

    //create scene
    const scene = new THREE.Scene();

    //create cam
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 20.0);
    camera.position.set(0, 1, 5);

    //camera controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.screenSpacePanning = true;
    controls.target.set(0.0, 1.0, 0.0);
    controls.update();

    //light
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1.0, 1.0, 1.0).normalize();
    scene.add(light);

    // 入力されたボーンの単位ベクトルを求める

    function computeUnit(bonesArray) {
        let NormVec = new Array();
        NormVec[0] = new THREE.Vector3(bonesArray[1][0] - bonesArray[0][0], bonesArray[1][1] - bonesArray[0][1], bonesArray[1][2] - bonesArray[0][2]).normalize();
        NormVec[1] = new THREE.Vector3(bonesArray[2][0] - bonesArray[1][0], bonesArray[2][1] - bonesArray[1][1], bonesArray[2][2] - bonesArray[1][2]).normalize();
        NormVec[2] = new THREE.Vector3(bonesArray[3][0] - bonesArray[2][0], bonesArray[3][1] - bonesArray[2][1], bonesArray[3][2] - bonesArray[2][2]).normalize();
        NormVec[3] = new THREE.Vector3(bonesArray[4][0] - bonesArray[0][0], bonesArray[4][1] - bonesArray[0][1], bonesArray[4][2] - bonesArray[0][2]).normalize();
        NormVec[4] = new THREE.Vector3(bonesArray[5][0] - bonesArray[4][0], bonesArray[5][1] - bonesArray[4][1], bonesArray[5][2] - bonesArray[4][2]).normalize();
        NormVec[5] = new THREE.Vector3(bonesArray[6][0] - bonesArray[5][0], bonesArray[6][1] - bonesArray[5][1], bonesArray[6][2] - bonesArray[5][2]).normalize();
        NormVec[6] = new THREE.Vector3(bonesArray[7][0] - bonesArray[0][0], bonesArray[7][1] - bonesArray[0][1], bonesArray[7][2] - bonesArray[0][2]).normalize();
        NormVec[7] = new THREE.Vector3(bonesArray[8][0] - bonesArray[6][0], bonesArray[8][1] - bonesArray[6][1], bonesArray[8][2] - bonesArray[6][2]).normalize();
        NormVec[8] = new THREE.Vector3(bonesArray[9][0] - bonesArray[8][0], bonesArray[9][1] - bonesArray[8][1], bonesArray[9][2] - bonesArray[8][2]).normalize();
        NormVec[9] = new THREE.Vector3(bonesArray[10][0] - bonesArray[9][0], bonesArray[10][1] - bonesArray[9][1], bonesArray[10][2] - bonesArray[9][2]).normalize();
        NormVec[10] = new THREE.Vector3(bonesArray[11][0] - bonesArray[9][0], bonesArray[11][1] - bonesArray[9][1], bonesArray[11][2] - bonesArray[9][2]).normalize();
        NormVec[11] = new THREE.Vector3(bonesArray[12][0] - bonesArray[11][0], bonesArray[12][1] - bonesArray[11][1], bonesArray[12][2] - bonesArray[11][2]).normalize();
        NormVec[12] = new THREE.Vector3(bonesArray[13][0] - bonesArray[12][0], bonesArray[13][1] - bonesArray[12][1], bonesArray[13][2] - bonesArray[12][2]).normalize();
        NormVec[13] = new THREE.Vector3(bonesArray[14][0] - bonesArray[9][0], bonesArray[14][1] - bonesArray[9][1], bonesArray[14][2] - bonesArray[9][2]).normalize();
        NormVec[14] = new THREE.Vector3(bonesArray[15][0] - bonesArray[14][0], bonesArray[15][1] - bonesArray[14][1], bonesArray[15][2] - bonesArray[14][2]).normalize();
        NormVec[15] = new THREE.Vector3(bonesArray[16][0] - bonesArray[15][0], bonesArray[16][1] - bonesArray[15][1], bonesArray[16][2] - bonesArray[15][2]).normalize();

        return NormVec;
    }

    function computeLength(vrm) {
        let vrmLength = new Array();
        vrmLength[0] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.z
        ).length();
        vrmLength[1] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg).position.z
        ).length();
        vrmLength[2] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightFoot).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightFoot).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightFoot).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg).position.z
        ).length();
        vrmLength[3] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.z
        ).length();
        vrmLength[4] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg).position.z
        ).length();
        vrmLength[5] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftFoot).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftFoot).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftFoot).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg).position.z
        ).length();
        vrmLength[6] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.z
        ).length();
        vrmLength[7] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position.z
        ).length();
        vrmLength[8] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position.z
        ).length();
        vrmLength[9] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z
        ).length();
        vrmLength[10] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z
        ).length();
        vrmLength[11] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).position.z
        ).length();
        vrmLength[12] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).position.z
        ).length();
        vrmLength[13] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z
        ).length();
        vrmLength[14] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).position.z
        ).length();
        vrmLength[15] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).position.z
        ).length();
        vrmLength[16] = new THREE.Vector3(
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.x - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.x,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.y - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.y,
            vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.z - vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z
        ).length();

        return vrmLength;
    }

    function computeDisModel(NormVec, vrmLength) {
        let DistModelVec = new Array();
        for (var i = 0; i < 17; i++) {
            DistModelVec[i] = NormVec[i] * vrmLength[i];
        }

        return DistModelVec;
    }

    function computeAddHipsCood(DistModelVec, vrm) {
        let ModelCood = new Array();

        ModelCood[0] = new THREE.Vector3(
            DistModelVec[0][0] + vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.x,
            DistModelVec[0][1] + vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.y,
            DistModelVec[0][2] + vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.z
        );
        ModelCood[1] = new THREE.Vector3(
            DistModelVec[1][0] + ModelCood[0][0],
            DistModelVec[1][1] + ModelCood[0][1],
            DistModelVec[1][2] + ModelCood[0][2]
        );
        ModelCood[2] = new THREE.Vector3(
            DistModelVec[2][0] + ModelCood[1][0],
            DistModelVec[2][1] + ModelCood[1][1],
            DistModelVec[2][2] + ModelCood[1][2]
        );
        ModelCood[3] = new THREE.Vector3(
            DistModelVec[3][0] + vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.x,
            DistModelVec[3][1] + vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.y,
            DistModelVec[3][2] + vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.z
        );
        ModelCood[4] = new THREE.Vector3(
            DistModelVec[4][0] + ModelCood[3][0],
            DistModelVec[4][1] + ModelCood[3][1],
            DistModelVec[4][2] + ModelCood[3][2]
        );
        ModelCood[5] = new THREE.Vector3(
            DistModelVec[5][0] + ModelCood[4][0],
            DistModelVec[5][1] + ModelCood[4][1],
            DistModelVec[5][2] + ModelCood[4][2]
        );
        ModelCood[6] = new THREE.Vector3(
            DistModelVec[6][0] + vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.x,
            DistModelVec[6][1] + vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.y,
            DistModelVec[6][2] + vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.z
        );
        ModelCood[7] = new THREE.Vector3(
            DistModelVec[7][0] + ModelCood[6][0],
            DistModelVec[7][1] + ModelCood[6][1],
            DistModelVec[7][2] + ModelCood[6][2]
        );
        ModelCood[8] = new THREE.Vector3(
            DistModelVec[8][0] + ModelCood[7][0],
            DistModelVec[8][1] + ModelCood[7][1],
            DistModelVec[8][2] + ModelCood[7][2]
        );
        ModelCood[9] = new THREE.Vector3(
            DistModelVec[9][0] + ModelCood[8][0],
            DistModelVec[9][1] + ModelCood[8][1],
            DistModelVec[9][2] + ModelCood[8][2]
        );
        ModelCood[10] = new THREE.Vector3(
            DistModelVec[10][0] + ModelCood[8][0],
            DistModelVec[10][1] + ModelCood[8][1],
            DistModelVec[10][2] + ModelCood[8][2]
        );
        ModelCood[11] = new THREE.Vector3(
            DistModelVec[11][0] + ModelCood[10][0],
            DistModelVec[11][1] + ModelCood[10][1],
            DistModelVec[11][2] + ModelCood[10][2]
        );
        ModelCood[12] = new THREE.Vector3(
            DistModelVec[12][0] + ModelCood[11][0],
            DistModelVec[12][1] + ModelCood[11][1],
            DistModelVec[12][2] + ModelCood[11][2]
        );
        ModelCood[13] = new THREE.Vector3(
            DistModelVec[13][0] + ModelCood[8][0],
            DistModelVec[13][1] + ModelCood[8][1],
            DistModelVec[13][2] + ModelCood[8][2]
        );
        ModelCood[14] = new THREE.Vector3(
            DistModelVec[14][0] + ModelCood[13][0],
            DistModelVec[14][1] + ModelCood[13][1],
            DistModelVec[14][2] + ModelCood[13][2]
        );
        ModelCood[15] = new THREE.Vector3(
            DistModelVec[15][0] + ModelCood[14][0],
            DistModelVec[15][1] + ModelCood[14][1],
            DistModelVec[15][2] + ModelCood[14][2]
        );
        return ModelCood;
    }


    //gltf and vrm
    let currentVrm = undefined;
    const loader = new THREE.GLTFLoader();
    loader.crossOrigin = 'anonymous';
    loader.load(
        'assetts/MikuMiku.vrm',
        (gltf) => {
            THREE.VRM.from(gltf).then((vrm) => {
                scene.add(vrm.scene);
                console.log(vrm);

                // let normvec = computeUnit(array);
                // let vrmlength = computeLength(vrm);
                // let DistModelVec = computeDisModel(normvec, vrmlength);
                // console.log(DistModelVec);
                // let ModelCood = computeAddHipsCood(DistModelVec, vrm);

                // console.log(ModelCood);

                // //set bone position
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.x = ModelCood[0][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.y = ModelCood[0][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).position.z = ModelCood[0][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg).position.x = ModelCood[1][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg).position.y = ModelCood[1][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperLeg).position.z = ModelCood[1][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg).position.x = ModelCood[2][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg).position.y = ModelCood[2][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerLeg).position.z = ModelCood[2][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightFoot).position.x = ModelCood[3][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightFoot).position.y = ModelCood[3][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightFoot).position.z = ModelCood[3][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg).position.x = ModelCood[4][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg).position.y = ModelCood[4][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperLeg).position.z = ModelCood[4][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg).position.x = ModelCood[5][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg).position.y = ModelCood[5][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerLeg).position.z = ModelCood[5][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftFoot).position.x = ModelCood[6][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftFoot).position.y = ModelCood[6][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftFoot).position.z = ModelCood[6][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position.x = ModelCood[7][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position.y = ModelCood[7][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Spine).position.z = ModelCood[7][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position.x = ModelCood[8][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position.y = ModelCood[8][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).position.z = ModelCood[8][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.x = ModelCood[9][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.y = ModelCood[9][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Neck).position.z = ModelCood[9][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.x = ModelCood[10][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.y = ModelCood[10][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).position.z = ModelCood[10][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).position.x = ModelCood[11][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).position.y = ModelCood[11][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).position.z = ModelCood[11][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).position.x = ModelCood[12][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).position.y = ModelCood[12][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).position.z = ModelCood[12][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand).position.x = ModelCood[13][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand).position.y = ModelCood[13][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand).position.z = ModelCood[13][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).position.x = ModelCood[14][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).position.y = ModelCood[14][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).position.z = ModelCood[14][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).position.x = ModelCood[15][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).position.y = ModelCood[15][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).position.z = ModelCood[15][2];

                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand).position.x = ModelCood[16][0];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand).position.y = ModelCood[16][1];
                // vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand).position.z = ModelCood[16][2];


            });
        },
        (progress) => console.log('Loading moddel...', 100 * (progress.loaded / progress.total), '%'),
        (error) => console.error(error)
    );
    //helpers
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    renderer.render(scene, camera);

    tick();
    // 毎フレーム時に実行されるループイベントです
    function tick() {
        renderer.render(scene, camera); // レンダリング
        requestAnimationFrame(tick);
    }
}