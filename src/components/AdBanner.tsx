import GoogleAd from './GoogleAd';

export default function AdBanner() {
  return (
    <div className="my-6">
      <p className="text-[0.6rem] text-slate-400 mb-1 text-center">広告</p>
      <GoogleAd format="horizontal" />
    </div>
  );
}
