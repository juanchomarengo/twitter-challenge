import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const REGION = 'us-east-1'

const s3Client = new S3Client({
  region: REGION
})

const createPresignedUrlWithClient = ({ bucket, key }: { bucket: string | undefined; key: string }): any => {
  if (!bucket) throw new Error('Bucket name is required')

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key
  })
  return getSignedUrl(s3Client, command, { expiresIn: 3600 })
}

export { createPresignedUrlWithClient }
