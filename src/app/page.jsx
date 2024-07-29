"use client";
import { useEffect, useState } from "react";
import { app } from "./firebaseConfig";
import { CenterHeader } from "@/components/CenterHeader";
import {
  child,
  equalTo,
  get,
  getDatabase,
  limitToLast,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

let selectedCategories = [];
const productsByCategory = {};
let firstLoad = false;

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const router = useRouter();
  const db = getDatabase(app);

  useEffect(() => {
    if(!localStorage.getItem('user'))router.push('signup');
    getCategories();
    getAllProducts(20);
  }, []);

  const getCategories = async () => {
    const ctgr = Object.keys((await get(child(ref(db), "/categories"))).val());
    setCategories(ctgr);
  };

  const getAllProducts = async (numberOfProducts) => {
    const q = query(ref(db, "products"), limitToLast(numberOfProducts));
    const prods = (await get(q)).val();
    setProducts({ ...prods });
    firstLoad = true;
  };

  /**
   *
   * @param {import("react").FormEvent<HTMLInputElement>} ev
   */
  const onInput = async (ev) => {
    const val = ev.target.value;
    const checked = ev.target.checked;

    const q = (val) => {
      return query(ref(db, "products"), orderByChild("category"), equalTo(val));
    };

    if (checked) {
      selectedCategories.push(val);
      let prods = {};
      for (const category of selectedCategories) {
        if (productsByCategory[category]) {
          prods = firstLoad
            ? { ...productsByCategory[category] }
            : { ...products, ...productsByCategory[category] };
        } else {
          const res = (await get(q(category))).val();
          productsByCategory[category] = res;
          prods = firstLoad ? { ...res } : { ...products, ...res };
        }
      }
      firstLoad = false;
      setProducts(prods);
    } else {
      selectedCategories = selectedCategories.filter(
        (category) => category != val
      );
      if (!selectedCategories[0]) setProducts({});
      let prods = {};
      for (const category of selectedCategories) {
        prods = { ...prods, ...productsByCategory[category] };
      }
      setProducts(prods);
    }
  };

  return (
    <main>
      <section className="relative h-[300px]">
        <CenterHeader src="/logo2.png" />
        <figure className="absolute w-full h-full top-0 left-0 z-[-2]">
          <img src="/bg.png" className="w-full h-full" alt="" />
        </figure>
        <div className="absolute overlay w-full h-full z-[-1] top-0 left-0"></div>
        <section className="flex flex-col gap-3 justify-center items-center py-[70px]">
          <h1 className=" text-white text-2xl font-bold">Products</h1>
          <h1 className=" text-white text-xl font-semibold">Home/Products</h1>
        </section>
      </section>

      <section className="h-[600px] w-full py-[60px] px-3 flex justify-between max-[612px]:flex-col max-[612px]:gap-2">
        {/* <div className="container h-full m-auto "> */}
        <nav className="border-[1.5px] h-full border-gray-400 rounded w-[300px] max-[612px]:w-full">
          <h1 className="text-[#FFBB15] font-bold p-3">Categories : </h1>
          {categories.map((category, i) => (
            <div key={i} className="flex justify-between items-center p-3">
              <p className="text-gray-600 font-semibold capitalize">
                {category}
              </p>
              <input
                className="cursor-pointer"
                type="checkbox"
                value={category}
                onInput={onInput}
              />
            </div>
          ))}
        </nav>

        <section className="border-[1.5px] h-full min-[612px]:overflow-x-auto border-gray-400 grid custom-grid-col p-3 gap-3 rounded w-[calc(100%-320px)] max-[612px]:w-full max-[612px]:h-fit">
          {Object.keys(products).map((key, i) => {
            return (
              <div key={i} className="border-[1.5px] h-[280px] flex flex-col p-3 items-center justify-between rounded-lg border-gray-400">
                <figure>
                  <img className="w-[100px] max-h-[100px]" src={products[key].img} alt="" />
                </figure>
                <p className="text-[#FFBB15] font-bold">{products[key].productName}</p>
                <p className="text-gray-600 text-center text-[14px] font-medium">{products[key].desc}</p>
                <p className="text-gray-600 font-bold">{products[key].regualrPrice} EGP</p>
                <Button content="Add" fill={true}/>
              </div>
            );
          })}
        </section>
        {/* </div> */}
      </section>
    </main>
  );
}
