"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { CenterHeader } from "@/components/CenterHeader";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { app } from "../firebaseConfig";
import { Title } from "@/components/Title";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { uniqueID } from "../cocktail";
import { Warn } from "@/components/Warn";

function Dashboard() {
  const router = useRouter();
  const image = useRef();
  const inputFile = useRef();
  const [warn, setWarn] = useState("");
  const [userName, setUserName] = useState("");
  const db = getDatabase(app);
  const productSchema = {
    productName: "",
    regualrPrice: "",
    salePrice: "",
    desc: "",
    category: "",
    img: "",
  };
  const [productData, setProductData] = useState(productSchema);
  const successMsg = `Product uploaded successfully`;

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin")) || {};
    setUserName(admin.email?.match(/\w+/gi)[0]);
    if (!admin.uid) {
      router.push("/dashboard/login");
      return;
    }
    (async () => {
      const adminFromDb = await get(child(ref(db), `admins/${admin.uid}`));
      const userCredential = adminFromDb.val();
      if (userCredential.uid == admin.uid) {
        localStorage.setItem("adminChecked", "true");
      } else {
        alert("Fuck you , do not play in my localstorage 👊😡");
        localStorage.removeItem("admin");
        router.push(`/dashboard/login`);
      }
    })();
  }, []);

  const openInputfile = () => {
    inputFile.current.click();
  };

  /**
   *
   * @param {import("react").FormEvent} ev
   * @returns
   */
  const getLocalImage = async (ev) => {
    const key = "6bc0aad40997a4f674eec8247cd9d769";
    const img = ev.target.files[0];
    const imageData = new FormData();
    imageData.append("image", img);
    imageData.append("key", key);
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener("loadend", () => {
      image.current.src = reader.result;
    });
    const url = `https://api.imgbb.com/1/upload`;
    const res = await fetch(url, {
      method: "POST",
      body: imageData,
    });
    setProductData({ ...productData, img: await (await res.json()).data.url });
  };

  /**
   * 
   * @param {string} category 
   */
  const setProductInDB = (category) => {
    update(ref(db, `categories/${category.toLowerCase()}/products/${uniqueID()}`), {
      ...productData,
    });
  };

  const uploadProduct = async (ev) => {
    try {
      setProductInDB(productData.category);
      for (const key in productData) {
        if (!productData[key]) {
            setWarn(`${key} field must not be empty !`)
           return;
        }
      }
      setWarn(successMsg);
      setProductData(productSchema);
    } catch (error) {
      setWarn("Product uploading faild :(");
      console.error(error);
    } finally {
      ev.preventDefault();
    }
  };

  return (
    <main>
      <CenterHeader />
      <div className="container m-auto px-3">
        <Warn warn={warn} succesMsg={successMsg} /> 
      </div>
      <section className="pt-[30px] ">
        <div className="container m-auto flex max-[512px]:flex-col-reverse gap-3 p-3 ">
          <form
            onSubmit={uploadProduct}
            className=" flex flex-col gap-4 w-full min-[512px]:w-[50%]"
          >
            <Title content={`Weclome ${userName}!`} />
            <Input
              value={productData.productName}
              onInput={(ev) =>
                setProductData({ ...productData, productName: ev.target.value })
              }
              isNum={false}
              placeholder={"Enter product name"}
            />

            <Input
              value={productData.regualrPrice}
              onInput={(ev) =>
                setProductData({
                  ...productData,
                  regualrPrice: ev.target.value,
                })
              }
         
              placeholder={"Enter regular price"}
            />
            <Input
              value={productData.salePrice}
              onInput={(ev) =>
                setProductData({ ...productData, salePrice: ev.target.value })
              }
         
              placeholder={"Enter sale price"}
            />
            <Input
              value={productData.category}
              onInput={(ev) =>
                setProductData({ ...productData, category: ev.target.value })
              }
              isNum={false}
              placeholder={"Enter category name"}
            />
            <textarea
              value={productData.desc}
              onInput={(ev) =>
                setProductData({ ...productData, desc: ev.target.value })
              }
              className="p-3 rounded-md outline-none border-[1.5px] border-slate-400 text-black min-h-[200px]"
            ></textarea>

            <Button content="Upload" fill={true} />
          </form>

          <div className="w-full min-[512px]:w-[50%] flex justify-center items-center">
            <figure
              onClick={openInputfile}
              className="w-[300px] h-[300px] bg-[#eee] flex justify-center items-center cursor-pointer rounded-xl"
            >
              <img
                ref={image}
                src="/addImage.png"
                className="min-w-[150px] max-h-[300px]"
                alt="add product"
              />
              <input
              accept=".png , .jpg , .jpeg"
                ref={inputFile}
                onChange={getLocalImage}
                type="file"
                className="hidden"
              />
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
