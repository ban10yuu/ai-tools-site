import GoogleAd from './GoogleAd';

export default function AdBanner() {
  return (
    <div className="my-6">
      <p className="text-[0.6rem] text-[#4a5070] mb-1 text-center">ADVERTISEMENT</p>
      <GoogleAd format="horizontal" />
    </div>
  );
}
