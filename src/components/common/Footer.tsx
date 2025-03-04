const Footer = () => {
  return (
    <footer className="m-0 h-48 bg-gray-50">
      <section className="mx-auto flex h-full max-w-6xl items-center justify-between">
        <div>
          <p className="text-xs font-normal text-gray-500">ⓒ 2025. SubBox All rights reserved.</p>
          <p className="mt-2 text-xs font-normal text-gray-500">이메일 team.xxxx@gmail.com</p>
        </div>
        <div>
          <p className="text-xs font-normal text-gray-500">
            <a href="https://github.com/kimywann/sub-box" target="_blank" rel="noopener noreferrer">
              깃허브
            </a>
          </p>
          <p className="mt-2 text-xs font-normal text-gray-500">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfGTwHIAtpM2RwLJVKKRs6bSfDmLugB7I9ZtlYmfh7HYOxRig/viewform?usp=dialog">서비스 피드백</a>
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
