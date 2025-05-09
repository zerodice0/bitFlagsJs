![Main](./images/main.png)
# BitFlagsJs
JavaScript와 TypeScript에서 비트 플래그를 쉽게 관리할 수 있는 가벼운 라이브러리입니다. BitFlagsJs는 BitArray를 간단하게 구현한 패키지로, 최소한의 API로 비트 플래그를 효율적으로 처리할 수 있습니다.

[![NPM Version](https://img.shields.io/npm/v/bitflagsjs.svg)](https://www.npmjs.com/package/bitflagsjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 설치

```bash
npm install bitflagsjs
# 또는
yarn add bitflagsjs
```

## 주요 기능

BitFlagsJs는 JavaScript와 TypeScript에서 비트 플래그 조작을 단순화합니다:
- 최소한의 오버헤드로 구현된 간단한 BitArray
- 32비트 정수 배열을 사용하여 비트 플래그 관리
- 비트를 설정, 해제 및 확인하기 위한 간단한 API
- 32비트 경계를 넘어서는 인덱스의 자동 처리
- 완전한 타입 정의가 포함된 TypeScript 지원

## 사용법

### 가져오기

```javascript
// ES 모듈
import BitFlags from 'bitflagsjs';

// CommonJS
// const BitFlags = require('bitflagsjs').default;
```

### TypeScript 사용법

```typescript
import BitFlags from 'bitflagsjs';

// 타입 안전한 비트 플래그
const flags = new BitFlags();
flags.set(10);
const isSet: boolean = flags.is(10);
const flagArray: number[] = flags.get();
```

### 인스턴스 생성

```javascript
// 기본값 [0]으로 초기화
const bitFlags = new BitFlags();

// 초기값을 지정하여 생성
const initializedFlags = new BitFlags([5, 10]); // [0x00000101, 0x00000a00]
```

### 메서드

#### get()

현재 비트 마스크 배열을 반환합니다.

```javascript
const bitFlags = new BitFlags();
bitFlags.set(2);
bitFlags.set(35);
console.log(bitFlags.get()); // [4, 8]  // [0x00000100, 0x00000008]
```

#### is(index)

지정된 인덱스의 비트가 설정되어 있는지 확인합니다.

```javascript
const bitFlags = new BitFlags([3]); // [0x00000011]
const isMaskedFirstBit = bitFlags.is(0);  // true
const isMaskedSecondBit = bitFlags.is(1); // true
const isMaskedThirdBit = bitFlags.is(2);  // false
```

#### set(index)

지정된 인덱스의 비트를 설정합니다.

```javascript
const bitFlags = new BitFlags(); // [0x00000000]
bitFlags.set(0); // [0x00000001]
bitFlags.set(1); // [0x00000011]
bitFlags.set(4); // [0x00001011]
```

#### unset(index)

지정된 인덱스의 비트를 해제합니다.

```javascript
const bitFlags = new BitFlags([3]); // [0x00000011]
bitFlags.unset(0); // [0x00000010]
bitFlags.unset(1); // [0x00000000]
```

#### clear()

모든 비트 플래그를 초기화하여 배열을 초기 상태로 되돌립니다.

```javascript
const bitFlags = new BitFlags([15, 7]); // [0x0000000f, 0x00000007]
bitFlags.clear(); // [0x00000000]
console.log(bitFlags.get()); // [0]
```

#### count()

비트 플래그 배열에서 설정된 비트의 개수를 반환합니다.

```javascript
const bitFlags = new BitFlags([3]); // [0x00000011] (2개 비트 설정됨)
console.log(bitFlags.count()); // 2

bitFlags.set(4); // [0x00010011] (3개 비트 설정됨)
console.log(bitFlags.count()); // 3
```

#### 비트 연산

BitFlagsJs는 두 BitFlags 인스턴스 간의 비트 연산을 지원합니다:

##### and(other)

현재 인스턴스와 다른 BitFlags 인스턴스 모두에서 설정된 비트를 가진 새 BitFlags 인스턴스를 반환합니다 (AND 연산).

```javascript
const flags1 = new BitFlags([5]); // [0x00000101]
const flags2 = new BitFlags([3]); // [0x00000011]
const result = flags1.and(flags2); // [0x00000001]
console.log(result.get()); // [1]
```

##### or(other)

현재 인스턴스 또는 다른 BitFlags 인스턴스 중 하나라도 설정된 비트를 가진 새 BitFlags 인스턴스를 반환합니다 (OR 연산).

```javascript
const flags1 = new BitFlags([5]); // [0x00000101]
const flags2 = new BitFlags([3]); // [0x00000011]
const result = flags1.or(flags2); // [0x00000111]
console.log(result.get()); // [7]
```

##### xor(other)

현재 인스턴스 또는 다른 BitFlags 인스턴스 중 하나에만 설정된 비트를 가진 새 BitFlags 인스턴스를 반환합니다 (XOR 연산).

```javascript
const flags1 = new BitFlags([5]); // [0x00000101]
const flags2 = new BitFlags([3]); // [0x00000011]
const result = flags1.xor(flags2); // [0x00000110]
console.log(result.get()); // [6]
```

##### not()

모든 비트가 반전된 새 BitFlags 인스턴스를 반환합니다 (NOT 연산).

```javascript
const flags = new BitFlags([5]); // [0x00000101]
const result = flags.not(); // [0xfffffffa]
console.log(result.is(0)); // false
console.log(result.is(1)); // true
console.log(result.is(2)); // true
```

## 예제: 사용자 권한 관리

```javascript
// 권한 정의
const PERMISSIONS = {
  READ: 0,
  WRITE: 1,
  DELETE: 2,
  ADMIN: 3
};

// 사용자 권한 설정
const userPermissions = new BitFlags();
userPermissions.set(PERMISSIONS.READ);
userPermissions.set(PERMISSIONS.WRITE);

// 권한 확인
if (userPermissions.is(PERMISSIONS.READ)) {
  console.log('사용자는 읽기 권한이 있습니다.');
}

if (!userPermissions.is(PERMISSIONS.ADMIN)) {
  console.log('사용자는 관리자 권한이 없습니다.');
}

// 권한 제거
userPermissions.unset(PERMISSIONS.WRITE);
```

## 기술 세부 사항

BitFlagsJs는 32비트 정수 배열을 사용하여 비트 플래그를 관리합니다. 32 이상의 인덱스를 사용하면 자동으로 새 배열 요소가 할당됩니다.

## 기여하기

프로젝트에 기여하고 싶으신가요? 환영합니다!

1. 이 저장소를 포크하세요
2. 새 기능 브랜치를 만드세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'feat: 새로운 기능 추가'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 제출하세요

### 커밋 메시지 규칙

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가 및 수정
- `chore`: 빌드 과정 또는 보조 도구 변경

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 문의하기

- 이슈: [GitHub Issues](https://github.com/zerodice0/bitFlagsJs/issues)
- 저자: [zerodice0](https://github.com/zerodice0)