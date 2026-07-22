'use client';

import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { CloudinaryAsset } from '@/types/upload';
import { UploadCloud } from 'lucide-react';

interface UploadWidgetProps {
  onSuccess: (assets: CloudinaryAsset[]) => void;
  onError?: (error: string) => void;
  children?: (openWidget: () => void) => React.ReactNode;
}

export function UploadWidget({ onSuccess, onError, children }: UploadWidgetProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleSuccess = (result: any) => {
    if (result?.info && typeof result.info === 'object') {
      const info = result.info;
      const asset: CloudinaryAsset = {
        public_id: info.public_id,
        secure_url: info.secure_url,
        url: info.url,
        format: info.format || info.resource_type,
        resource_type: info.resource_type || 'image',
        bytes: info.bytes || 0,
        width: info.width,
        height: info.height,
        created_at: info.created_at || new Date().toISOString(),
        asset_id: info.asset_id,
        original_filename: info.original_filename,
        filename: info.original_filename || info.public_id.split('/').pop(),
      };
      onSuccess([asset]);
    }
  };

  const handleError = (error: any) => {
    console.error('Cloudinary upload error:', error);
    if (onError) {
      onError(typeof error === 'string' ? error : error?.statusText || 'Upload failed. Please check your credentials.');
    }
  };

  // If no cloud name is configured, display an informative warning helper
  if (!cloudName) {
    return (
      <div className="w-full">
        {children ? (
          children(() => {
            if (onError) {
              onError('Cloud Name is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment variables.');
            }
          })
        ) : (
          <button
            type="button"
            onClick={() => {
              if (onError) {
                onError('Cloud Name is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment variables.');
              }
            }}
            className="btn-primary"
          >
            <UploadCloud className="h-5 w-5" />
            Upload File
          </button>
        )}
      </div>
    );
  }

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      options={{
        maxFileSize: 100000000, // 100MB max file size
        sources: ['local', 'url', 'camera'],
        resourceType: 'auto',
        multiple: true,
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#E2E8F0',
            tabIcon: '#10B981',
            menuInact: '#64748B',
            menuAct: '#10B981',
            link: '#10B981',
            action: '#10B981',
            inactiveTabIcon: '#94A3B8',
            error: '#EF4444',
            inProgress: '#10B981',
            complete: '#10B981',
            sourceBg: '#F8FAFC',
          },
        },
      }}
      onSuccess={handleSuccess}
      onError={handleError}
    >
      {({ open }) => {
        if (children) {
          return children(() => open?.());
        }
        return (
          <button
            type="button"
            onClick={() => open?.()}
            className="btn-primary shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 cursor-pointer"
          >
            <UploadCloud className="h-5 w-5" />
            Browse Files & Upload
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
