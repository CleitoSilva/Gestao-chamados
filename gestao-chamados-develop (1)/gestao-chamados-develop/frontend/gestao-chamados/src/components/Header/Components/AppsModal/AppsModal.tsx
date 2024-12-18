import { IoIosApps as DefaultIcon } from "react-icons/io";

import * as ai from "react-icons/ai";
import * as bi from "react-icons/bi";
import * as bs from "react-icons/bs";
import * as cg from "react-icons/cg";
import * as ci from "react-icons/ci";
import * as di from "react-icons/di"
import * as fa from "react-icons/fa"
import * as fa6 from "react-icons/fa6"
import * as fc from "react-icons/fc"
import * as fi from "react-icons/fi"
import * as gi from "react-icons/gi"
import * as go from "react-icons/go"
import * as gr from "react-icons/gr"
import * as hi from "react-icons/hi"
import * as hi2 from "react-icons/hi2"
import * as im from "react-icons/im"
import * as io from "react-icons/io"
import * as io5 from "react-icons/io5"
import * as lia from "react-icons/lia"
import * as lu from "react-icons/lu"
import * as md from "react-icons/md"
import * as pi from "react-icons/pi"
import * as ri from "react-icons/ri"
import * as rx from "react-icons/rx"
import * as si from "react-icons/si"
import * as sl from "react-icons/sl"
import * as tb from "react-icons/tb"
import * as tfi from "react-icons/tfi"
import * as ti from "react-icons/ti"
import * as vsc from "react-icons/vsc"
import * as wi from "react-icons/wi"

import "./AppsModal.css";
import AppItem from "../AppItem/AppItem";
import { useEffect, useState } from "react";
import { getAllProjects } from "../../../../apis/Rxct/functions/Project/GetAllProjects";
import { IProject } from "../../../../interfaces/IProject";

// Define type for library
type IconLibrary = typeof ai | typeof bi | typeof bs | typeof cg | typeof ci | typeof di | typeof fa | typeof fa6 | typeof fc | typeof fi | typeof gi | typeof go | typeof gr | typeof hi | typeof hi2 | typeof im | typeof io | typeof io5 | typeof lia | typeof lu | typeof md | typeof pi | typeof ri | typeof rx | typeof si | typeof sl | typeof tb | typeof tfi | typeof ti | typeof vsc | typeof wi;

// Define type for library mapping
type LibraryMap = {
  [key: string]: IconLibrary;
}


const libs: LibraryMap = {
  "ai": ai,
  "bi": bi,
  "bs": bs,
  "cg": cg,
  "ci": ci,
  "di": di,
  "fa": fa,
  "fa6": fa6,
  "fc": fc,
  "fi": fi,
  "gi": gi,
  "go": go,
  "gr": gr,
  "hi": hi,
  "hi2": hi2,
  "im": im,
  "io": io,
  "io5": io5,
  "lia": lia,
  "lu": lu,
  "md": md,
  "pi": pi,
  "ri": ri,
  "rx": rx,
  "si": si,
  "sl": sl,
  "tb": tb,
  "tfi": tfi,
  "ti": ti,
  "vsc": vsc,
  "wi": wi,
};

interface IAppsModal {
  close: () => void;
}

function AppsModal({ close }: IAppsModal) {

  const [projects, setProjects] = useState<IProject[]>();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const projects = await getAllProjects();

        setProjects(projects);
      } catch (error) {
        console.error("Ocorreu erro ao listar os projetos. Error: " + error);

        setProjects(undefined);
      }
    }

    getProjects();
  }, [])

  const handleClickOverlay = (e: React.MouseEvent) => {
    const modal = document.getElementById("apps-gallery");

    if (modal && !modal.contains(e.target as Node)) {
      close();
    }
  }

  type IconProps = {
    color?: string;
    size?: number;
  };

  const handleIcon = (lib: keyof LibraryMap, name: keyof IconLibrary) => {
    const lib_ = libs[lib];

    if (!lib_) return <DefaultIcon />;

    const Icon = lib_[name] as React.ComponentType<IconProps> | undefined;

    if (!Icon) return <DefaultIcon />;

    return <Icon />;
  }

  return (
    <section className="apps-modal">
      <div className="apps-modal-overlay" onMouseDown={handleClickOverlay} />
      <article id="apps-gallery" className="apps-gallery">
        <ul>
          {projects && projects.map((p, index) =>
            <li key={index} title={p.title}>
              <AppItem
                key={p.link}
                title={p.title}
                activeWhen={p.activeWhen}
                color={p.color}
                icon={handleIcon(p.lib, p.icon as keyof IconLibrary)}
                link={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/${p.link}`}
              />
            </li>
          )}
        </ul>
      </article>
    </section>
  );
}

export default AppsModal;