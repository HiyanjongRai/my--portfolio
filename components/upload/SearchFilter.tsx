'use client';

import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { FilterCategory, SortOption } from '@/types/upload';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  category: FilterCategory;
  onCategoryChange: (cat: FilterCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalResults: number;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalResults,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 md:p-5 rounded-3xl border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by filename or public ID..."
          className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-11 pr-10 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter and Sort options */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Filter Category */}
        <div className="relative flex items-center">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as FilterCategory)}
            className="rounded-2xl bg-slate-50 border border-slate-200 pl-10 pr-9 py-3 text-xs md:text-sm font-bold text-slate-700 hover:bg-slate-100 focus:outline-none focus:border-emerald-500 transition-all cursor-pointer appearance-none"
          >
            <option value="all">All Media</option>
            <option value="image">🖼 Images Only</option>
            <option value="video">🎥 Videos Only</option>
          </select>
        </div>

        {/* Sort selector */}
        <div className="relative flex items-center">
          <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-2xl bg-slate-50 border border-slate-200 pl-10 pr-9 py-3 text-xs md:text-sm font-bold text-slate-700 hover:bg-slate-100 focus:outline-none focus:border-emerald-500 transition-all cursor-pointer appearance-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>

        {/* Results Counter */}
        <div className="hidden lg:flex items-center px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-xs font-bold text-emerald-700">
          <span>{totalResults} {totalResults === 1 ? 'file' : 'files'}</span>
        </div>
      </div>
    </div>
  );
}
