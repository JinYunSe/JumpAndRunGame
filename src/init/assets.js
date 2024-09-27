import fs from 'fs';
// 파일 시스템을 읽어오기 위해 사용
import path from 'path';
// 우리가 만든 assets 폴더 아래 파일들을 읽어오기 위해
// Node.js에서 지원해주는 path를 import 해줍니다.
import { fileURLToPath } from 'url';
// Node.js에서 지원해주는 url 패키지
// fileURLToPath는 파일 형식의 url을
// 일반적인 url 형식으로 바꿔줍니다.

let gameAssets = {};

const __filename = fileURLToPath(import.meta.url);
// import.meta.url은 현재 파일(assets.js)이 실행되고 있는 절대 경로를 나타냅니다.
// 형태는 file://C:/Users/~~~~/~~~/assets.js 형식을 출력 됩니다.
// fileURLToPath 함수로 C:/Users/~~~/~~~/assets.js로 만들어줍니다.

const __dirname = path.dirname(__filename);
// /assets.js를 버린 디렉토리를 찾는다.
const basePath = path.join(__dirname, '../../assets');
// 상위 폴더를 2번 이동한 위치에 있는 assets 폴더에 들어갑니다.

// 파일 읽는 함수
// 비동기 별렬로 파일을 읽는다.
const readFileAsync = (fileName) => {
  return new Promise((resolve, reject) => {
    // 3개의 파일을 한 번에 읽을 경우
    // 파일 읽기에 소요 시간이 다른데
    // Promise로 소요 시간이 가징 긴 파일의 시간까지
    // 다른 파일들을 기다리게 해줄 예정입니다. (Promise.all).

    fs.readFile(path.join(basePath, fileName), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
    //readFile로 파일을 읽어온다.
    //매개변수로은 파일 경로, 옵션, 콜백 함수가 필요하다

    // fs.readFile(path.join(basePath, fileName),'utf8', ()=>{})
    // 경로는 basePath에 있는 assets 폴더 위치와 fileName의 매개변수로 파일 이름을 붙여줍니다.

    // options은 'utf8' 형식으로 줘 사람이 읽을 수 있는 파일 형식으로 해줍니다.

    // 콜백 함수로는 error가 날 경우 reject(err)와 return으로 함수를 거절하고
    // 정상 수행의 경우 resolve(JSON.parse(data)) 해줍니다.
    // JSON.parse로 data를 다시 JSON 형식으로 만들어줍니다.

    //이때 파일 경로를 정하기 위해서는 현재 파일(assets.js) 파일의 경로로 부터
    //찾고자 하는 파일의 위치를 찾아줘야 합니다.
    // 그래서 import {fileURLToPath} from 'url' 해줍니다.
  });
};

// Promise.all()을 사용한
// 비동기 병렬 처리
const loadGameAssets = async () => {
  try {
    const [stages, items, itemsUnlocks] = await Promise.all([
      readFileAsync('stage.json'),
      readFileAsync('item.json'),
      readFileAsync('item_unlock.json'),
    ]);
    // readFileAsync로 assets 폴더 안 .json파일
    // 을 읽어오고, 배열에 값을 저장해줍니다.
    // 파일 이름을 따로 관리하는 방식으로
    // 하드 코딩을 안 하는 방법도 있다.

    gameAssets = { stages, items, itemsUnlocks };
    // 비동기 병렬 처리가 끝났으면 객체에 담아줍니다.
    return gameAssets;
  } catch (error) {
    throw new Error('Failed to load game assets :' + error.message);
  }
  // 파일을 동시에 읽는 중 하나의 파일에서 오류가 발생할 경우를 대비해
  // try-catch 문을 사용해줍니다.
};

const getGameAssets = () => {
  return gameAssets;
};

export { loadGameAssets, getGameAssets };
