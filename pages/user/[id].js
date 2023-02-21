/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

export async function getStaticPaths() {
  const resp = await fetch(
    "https://dummyapi.io/data/v1/user?limit=100", {
      method: 'GET',
      headers: {
        "app-id": "63f4f0d548d3a1e0aa781c05"
      }
    }
  );
  const users = await resp.json();

  return {
    paths: users.data.map((user) => ({
      params: { id: user.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resp = await fetch(
    `https://dummyapi.io/data/v1/user/${params.id}`, {
      method: 'GET',
      headers: {
        "app-id": "63f4f0d548d3a1e0aa781c05"
      }
    }
  );

  return {
    props: {
      user: await resp.json(),
    },
    revalidate: 10,
  };
}

export default function Details({ user }) {
  return (
    <div>
      <Head>
        <title>{user.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`${user.picture}`}
            alt={user.firstName}
          />
        </div>
        <div>
          <div className={styles.name}>{user.firstName}</div>
          <div className={styles.name}>Gender: {user.gender}</div>
        </div>
      </div>
    </div>
  );
}