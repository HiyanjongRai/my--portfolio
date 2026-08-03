'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { UploadClient } from '@/components/upload/UploadClient';

export default function UploadSlugPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = typeof rawSlug === 'string' ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] : '';
  const isAuthorized = slug.toLowerCase() === 'hiyan';

  return <UploadClient isAuthorized={isAuthorized} slug={slug} />;
}
