import React from "react";
import Layout from "../components/Layout";
import KanbanBoard from "../components/KanbanBoard";
import { QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { useIdentity } from "utils/useIdentity";
import { fetchIdentity } from "utils/useIdentity";

const HomePage: React.FC = () => {
  const identity = useIdentity();

  if (!identity) {
    return <div>Error fetching identity</div>;
  }

  return (
    <Layout>
      <KanbanBoard boardId={identity?.userId} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const identity = await fetchIdentity();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Board>(
    ["board", identity?.userId],
    async () => {
      const response = await fetch(
        `http://localhost:3000/api/boards/${identity?.userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch board data");
      }
      return response.json();
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default HomePage;
