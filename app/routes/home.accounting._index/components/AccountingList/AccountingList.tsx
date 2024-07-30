import { Card404 } from "~/components";
import AccountingCard from "./AccountingCard";
import type { AccountingProps } from "~/interfaces";
import AccountingListSkeleton from "./AccountingListSkeleton";

interface AccountingListProps {
  accountings: AccountingProps[];
  isSearching: boolean;
}

const AccountingList = ({ accountings, isSearching }: AccountingListProps) => {
  return (
    <>
      {isSearching ? (
        <AccountingListSkeleton />
      ) : accountings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
          {accountings.map((accounting) => (
            <AccountingCard key={accounting.id} accounting={accounting} />
          ))}
        </div>
      ) : (
        <Card404
          title="Accountings were not found with this search"
          description="Try another search"
        />
      )}
    </>
  );
};

export default AccountingList;
