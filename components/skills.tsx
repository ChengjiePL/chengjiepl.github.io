"use client";

import type React from "react";

import { useState, useCallback, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Database,
  Globe,
  Palette,
  Server,
  Cpu,
  GitBranch,
  Terminal,
} from "lucide-react";

import { AiOutlineKubernetes } from "react-icons/ai";
import { FaDocker, FaPython, FaAws, FaJenkins } from "react-icons/fa";
import { FcLinux } from "react-icons/fc";
import { SiHackthebox, SiTerraform } from "react-icons/si";
import { TbBrandCpp, TbBrandAnsible } from 'react-icons/tb';
import { DiJenkins } from 'react-icons/di';

// Skill categories with their respective skills
const skillsData = {
  frontend: [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "Next.js", level: 70 },
    { name: "Tailwind CSS", level: 85 },
  ],
  backend: [
    { name: "Node.js", level: 75 },
    { name: "Express", level: 70 },
    { name: "Python", level: 65 },
    { name: "Django", level: 60 },
    { name: "RESTful APIs", level: 80 },
    { name: "GraphQL", level: 65 },
  ],
  database: [
    { name: "MongoDB", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "MySQL", level: 65 },
    { name: "Firebase", level: 80 },
    { name: "Redis", level: 60 },
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "Docker", level: 70 },
    { name: "CI/CD", level: 75 },
    { name: "AWS", level: 65 },
    { name: "Vercel", level: 80 },
    { name: "VS Code", level: 90 },
  ],
};

// Memoized skill bar component to prevent unnecessary re-renders
const SkillBar = memo(
  ({ skill }: { skill: { name: string; level: number } }) => {
    return (
      <Card key={skill.name}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{skill.name}</h3>
            <span className="text-sm text-muted-foreground">
              {skill.level}%
            </span>
          </div>
          <div className="h-2 bg-accent rounded-full overflow-hidden">
            {/* Replace Framer Motion with plain CSS for better performance */}
            <div
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
);
SkillBar.displayName = "SkillBar";

// Memoized tech icon component
const TechIcon = memo(
  ({ icon, name }: { icon: React.ReactNode; name: string }) => {
    return (
      <Card className="text-center hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="p-3 bg-primary/10 rounded-full mb-3">{icon}</div>
          <p className="text-sm font-medium">{name}</p>
        </CardContent>
      </Card>
    );
  },
);
TechIcon.displayName = "TechIcon";

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="text-primary">Skills</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Here are some of the technologies and tools I work with. I'm
          constantly learning and expanding my skill set.
        </p>

        <div className="mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: <FcLinux />, name: "Linux" },
              { icon: <Code />, name: "Scripting" },
              { icon: <TbBrandCpp />, name: "C/C++" },
              { icon: <FaPython />, name: "Python" },
              { icon: <SiHackthebox />, name: "Pentesting Tools" },
              { icon: <Terminal />, name: "CLI" },
              { icon: <FaAws />, name: "AWS" },
              { icon: <AiOutlineKubernetes />, name: "Kubernetes" },
              { icon: <FaDocker />, name: "Docker" },
              { icon: <FaJenkins />, name: "Jenkins" },
              { icon: <TbBrandAnsible />, name: "Ansible" },
              { icon: <SiTerraform />, name: "Ansible" },
            ]
              .slice(0, 12)
              .map((tech) => (
                <TechIcon key={tech.name} icon={tech.icon} name={tech.name} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
