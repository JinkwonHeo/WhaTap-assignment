const WIDGET_INFORMATION = {
  simultaneousUser: {
    title: '동시접속 사용자',
    description: [
      '실시간 브라우저 사용자 수를 보여줍니다. 5초마다 최근 5분 이내에 트랜잭션을 일으킨 사용자를 카운팅 하여 보여줍니다.',
      '사용자는 브라우저의 IP를 기반으로 카운팅 합니다. 에이전트 설정에서 사용자를 구분을 위해 IP를 사용하거나 쿠키를 사용할 수 있습니다.',
    ],
  },
  tps: {
    title: 'TPS',
    description: [
      'TPS는 초당 처리되는 트랜잭션 건수입니다.',
      '트랜잭션은 사용자의 요청이 애플리케이션 서버에서 응답을 보내기 위해 처리되는 한 건의 과정을 의미합니다.',
      '5초마다 처리된 트랜잭션의 수를 초당 건수로 환산하여 차트로 표현하고 있습니다. 최근 10분간의 TPS를 보여줍니다.',
      '모아보기와 개별 보기 버튼이 있어 개별 인스턴스의 TPS를 볼 수 있습니다. 다만 프로젝트내의 인스턴스 수가 너무 많으면 차트가 보이지 않을 수 있으으로 모아보기를 하는 것이 좋습니다.',
    ],
  },
  activeStatus: {
    title: '액티브 스테이터스 (Active Status)',
    description: [
      '액티브 트랜잭션들을 각 상태별로 갯수를 보여줍니다.',
      'DBC나 SOCKET의 갯수가 1이상에서 지속되면 문제가 있는지 의심해야합니다.',
    ],
    // '\nMETHOD	메소드를 수행중인 상태\nSQL	SQL을 수행중인 상태\nHTTPC	외부 API 호출 상태\nDBC	트랜잭션이 Connection Pool로 부터 새로운 Connection을 획득(get)하려는 상태\nSOCKET	외부로 TCP Socket을 연결 중인 상태\n',
  },
  todayUsers: {
    title: '금일 사용자',
    description: [
      '오늘 하루 동안의 사용자 수를 시간대별로 보여줍니다.',
      '어제 동시간대의 사용자 수를 함께 보여주어 비교가 가능합니다.',
    ],
  },
};

export { WIDGET_INFORMATION };
