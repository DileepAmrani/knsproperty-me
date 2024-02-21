import { GetStaticProps, GetStaticPaths } from 'next';
import Container from '@/blocks/atoms/container';
import Form from '@/blocks/molecules/forms/job';
import strapi, { populate } from '@/utils/strapi';
import React from 'react';
import { FiMapPin, FiDollarSign } from 'react-icons/fi';

interface JobData {
  id: number;
  attributes: {
    position: string;
    location: string;
    salary: number;
    description: string;
    responsibilities: string;
    requirements: string;
  };
}

interface Props {
  job: JobData;
}

const JobPage: React.FC<Props> = ({ job }) => {
  const { attributes } = job;
  return (
    <div>
      <Container>
        <div className="grid lg:grid-cols-[1.5fr_2fr] gap-5 lg:py-10 ">
          <div className="_center h-[300px] xl:h-auto bg-lightgray roudned-md mb-2 bg-[url('/pettern.avif')] bg-cover">
            <h1 className="text-3xl text-secondary font-bold text-center">{attributes.position}</h1>
          </div>
          <div className="lg:px-0 px-5">
            <h1 className="py-2 text-xl text-secondary font-semibold ">{attributes.position}</h1>
            <p className="text-sm font-[400] flex items-center">
              <FiMapPin className="mr-2" />
              {attributes.location}
            </p>
            <p className="text-sm font-[400] flex items-center">
              <FiDollarSign className="mr-2" />
              {attributes.salary} ADS
            </p>
            <p className="text-sm  flex items-center">{attributes.description}</p>

            <section className="my-2">
              <h3 className="mb-1 font-bold">Responsibility</h3>
              <p className="text-sm  flex items-center">{attributes.responsibilities}</p>
            </section>

            <section className="my-2">
              <h3 className="mb-1 font-bold">Requirements</h3>
              <p className="text-sm  flex items-center">{attributes.requirements}</p>
            </section>
          </div>
        </div>
      </Container>
      <Form id={job.id} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const jobs = await strapi.find<any>('jobs', {
    fields: ['slug'],
  });

  const paths = jobs.data.map((job: any) => ({
    params: { slug: job.attributes.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  try {
    const slug = params?.slug as string;
    const job = await getJob(slug);
    return { props: { job } };
  } catch (error) {
    console.error('Error fetching job:', error);
    return { props: { job: null } };
  }
};

const getJob = async (slug: string) => {
  const job = await strapi.find<JobData>('jobs', {
    populate,
    filters: {
      slug: slug,
    },
  });
  return job; // Assuming you only expect one job for a given slug
};

export default JobPage;
