const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

// 가짜 포스트 목록 데이터
const bridges = [
  {
    id: 1,
    bridge_index: "DSBR0001",
    created_date: "2020-12-30T07:39:00.000Z",
    bridge_nm: "교량A",
    spec: null,
    form: null,
    location: null,
    comm_seq: 1,
    code_index: null,
    developer_nm: "한국도로공사",
    bulider_nm: "두산건설(주)",
    site_nm: "고속도로 제14호 함양-울산선(함양-합천) 건설공사 제 3공구",
  },
  {
    id: 2,
    bridge_index: "DSBR0002",
    created_date: "2020-12-30T07:39:26.000Z",
    bridge_nm: "교량B",
    spec: null,
    form: null,
    location: null,
    comm_seq: 1,
    code_index: null,
    developer_nm: "한국도로공사",
    bulider_nm: "두산건설(주)",
    site_nm: "고속도로 제14호 함양-울산선(함양-합천) 건설공사 제 3공구",
  },
  {
    id: 3,
    bridge_index: "DSBR0004",
    created_date: "2020-12-31T08:20:21.000Z",
    bridge_nm: "교량C",
    spec: 371,
    form: null,
    location: "본선 STA. 6+084.7~6+455.2",
    comm_seq: 1,
    code_index: null,
    developer_nm: "한국도로공사",
    bulider_nm: "두산건설(주)",
    site_nm: "고속도로 제14호 함양-울산선(함양-합천) 건설공사 제 3공구",
  },
];

// 포스트 목록을 가져오는 비동기 함수
export const getBridges = async () => {
  await sleep(500); // 0.5초 쉬고
  return bridges; // posts 배열
};

// ID로 포스트를 조회하는 비동기 함수
export const getBridgesById = async (id) => {
  await sleep(500); // 0.5초 쉬고
  return bridges.find((bridge) => bridge.id === id); // id 로 찾아서 반환
};
