import styles from "../QueryStatus/QueryStatus.module.css";

interface QueryStatusProps {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  isEmpty: boolean;
  emptyMessage: string;
}

export default function QueryStatus({
  isLoading,
  isError,
  error,
  isEmpty,
  emptyMessage,
}: QueryStatusProps) {
  if (isLoading) {
    return <p className={`${styles.statusMessage} ${styles.loading}`}>Loading...</p>;
  }

  if (isError) {
    return (
      <p className={`${styles.statusMessage} ${styles.error}`}>
        Error: {error?.message ?? "Unknown error"}
      </p>
    );
  }

  if (isEmpty) {
    return <p className={`${styles.statusMessage} ${styles.empty}`}>{emptyMessage}</p>;
  }

  return null;
}
