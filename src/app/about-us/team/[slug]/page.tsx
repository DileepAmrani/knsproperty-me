import Container from "@/blocks/atoms/container";
import strapi from "@/utils/strapi";
import Image from "next/image";
import { GetServerSideProps } from "next";

interface TeamMember {
  Name: string;
  Position: string;
  Description: string;
  Profile: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface PageProps {
  attributes: TeamMember;
}

export default function Page({ attributes }: PageProps) {
  return (
    <main>
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 p-5 xl:h-[60vh]">
          <section className="flex items-center xl:justify-end justify-center">
            <div className="relative h-[300px] w-[300px] rounded-full overflow-hidden">
              <Image
                className="object-cover"
                style={{ objectPosition: "0px 0px" }}
                src={attributes.Profile.data.attributes.url}
                fill
                alt={attributes.Name}
                width={300} // Adjust as needed
                height={300} // Adjust as needed
              />
            </div>
          </section>
          <section className="flex items-center">
            <div>
              <h3 className="xl:text-left text-center capitalize text-xl group-hover:underline mb-1">
                {attributes.Name}
              </h3>
              <p className="xl:text-left text-center capitalize text-sm mb-2">
                {attributes.Position}
              </p>

              <p className="xl:text-left text-center text-sm">
                {attributes.Description}
              </p>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

// export const getServerSideProps: GetServerSideProps<PageProps> = async ({
//   params,
// }) => {
//   const slug = params?.slug;
//   if (!slug || typeof slug !== 'string') {
//     return {
//       notFound: true,
//     };
//   }
//   const attributes = await getData(slug);
//   return {
//     props: {
//       attributes,
//     },
//   };
// };

// async function getData(slug: string): Promise<TeamMember> {
//   const teamMemberResponse = await strapi.find<TeamMember>("teams", {
//     populate: ["Profile"],
//     filters: {
//       slug: slug,
//     },
//   });
//   const teamMember = teamMemberResponse.data[0];
//   return teamMember;
// }
