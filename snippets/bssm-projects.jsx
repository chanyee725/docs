export const BssmProjects = () => {
  const projects = [
    {
      title: "의료용 스마트미러 서비스",
      href: "/projects/bssm/medical-smart-mirror",
      image: "/projects/images/medical-smart-mirror.png",
      alt: "의료용 스마트미러 서비스",
      description:
        "거북목, 라운드 숄더 등 현대인의 대표적인 자세 문제를 집에 있는 전신 거울을 활용해 해결해보고자 개발한 자세 교정 서비스입니다.",
      period: "2023.4 – 2023.11",
      rewards: ["전공동아리 최우수상"],
      tags: ["전공동아리"],
    },
    {
      title: "포토 이머전시",
      href: "/projects/bssm/photo-immersion",
      image: "/projects/images/photo-immersion.png",
      alt: "포토 이머전시",
      description:
        "포토 이머전시 체험·서비스 프로젝트입니다. 촬영부터 몰입형 전시·공유까지의 사용자 흐름을 정리합니다.",
      period: "2023.11",
      rewards: [],
      tags: ["전공동아리"],
    },
  ];

  return (
    <>
      {projects.map((project) => (
        <div className="project-entry not-prose" key={project.href}>
          <div className="project-entry-media">
            <a href={project.href}>
              <img src={project.image} alt={project.alt} />
            </a>
          </div>
          <div className="project-entry-content">
            <h3 className="project-entry-title">
              <a href={project.href}>{project.title}</a>
            </h3>
            <div className="project-entry-desc">{project.description}</div>
            <div className="project-entry-meta">
              <span className="project-entry-period">{project.period}</span>
              <div className="project-entry-rewards">
                {project.rewards.map((reward) => (
                  <span key={reward} className="reward-tag">
                    {reward}
                  </span>
                ))}
              </div>
              <div className="project-entry-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-entry-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};