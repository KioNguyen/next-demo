/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const resp = await fetch(
    "https://dummyapi.io/data/v1/user?limit=100", {
      method: 'GET',
      headers: {
        "app-id": "63f4f0d548d3a1e0aa781c05"
      }
    }
  );

  return {
    props: {
      users: await resp.json(),
    },
  };
}

export default function Home({ users }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>User List Total: {users.data.length} </title>
      </Head>
      <h2>User List</h2>
      <div className={styles.grid}>
        {users.data.map((user) => (
          <div className={styles.card} key={user.id}>
            <Link href={`/user/${user.id}`}>
              <a>
                <img
                  src={`${user.picture}`}
                  alt={user.firstName}
                />
                <h3>{user.firstName} {user.lastName}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
