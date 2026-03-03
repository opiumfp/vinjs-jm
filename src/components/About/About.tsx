import type { AboutData } from '@/types/content';

interface Props {
  aboutData: AboutData;
}

export default function About({ aboutData }: Props) {
  return (
    <div className="about">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 align-self-center text-center">
            <div className="about_descrition">
              <h1 className="font-weight-bold">{aboutData.title}</h1>
              <p className="about_descrition-paragraph my-4">{aboutData.paragraph}</p>
              <a href={aboutData.link} className="btn btn-primary my-2 my-sm-0">
                {aboutData.linkTitle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
