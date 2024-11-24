"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Separate component to safely use client-side hooks
const SearchPageContent: React.FC = () => {
  const searchParams: any = useSearchParams();
  const [search, setSearch] = useState<string | null>(null);
  const [term, setTerm] = useState<string | null>(null);

  useEffect(() => {
    // Fetching client-side only data within useEffect to prevent hydration issues
    setSearch(searchParams.get("keyword"));
    setTerm(searchParams.get("term"));
  }, [searchParams]);

  if (!search && !term) return null; // Prevent displaying mismatched empty state

  return (
    <h1>
      Search Results for: {search} {term}
    </h1>
  );
};

const SearchPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
