const cloudinary = require("cloudinary").v2;

const signuploadform = (public_id) => {
  const apiSecret = process.env.NEXT_CLOUDINARY_SECRET;
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      public_id,
      folder:"myeik_guide",
    },
    apiSecret
  );

  return { timestamp, signature };
};

export async function POST(req) {
  const { public_id } = await req.json();
  console.log(public_id);
  const sig = await signuploadform(public_id);
  const apikey=process.env.NEXT_CLOUDINARY_KEY
  const cloudname=process.env.NEXT_CLOUDINARY_NAME

  return Response.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname,
    apikey
  })
}
