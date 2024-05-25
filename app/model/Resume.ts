import mongoose, { Schema } from "mongoose";
import {
  FeaturedSkill,
  Resume,
  ResumeCustom,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperience,
} from "../lib/redux/types";

const resumeProfileSchema = new Schema<ResumeProfile>({
  email: { type: String },
  location: { type: String },
  name: { type: String },
  phone: { type: String },
  summary: { type: String },
  url: { type: String },
});

const resumeWorkExperienceSchema = new Schema<ResumeWorkExperience>({
  company: { type: String },
  jobTitle: { type: String },
  date: { type: String },
  descriptions: [{ type: String }],
});

const resumeEducationSchema = new Schema<ResumeEducation>({
  school: { type: String },
  degree: { type: String },
  date: { type: String },
  gpa: { type: String },
  descriptions: [{ type: String }],
});

const resumeProjectSchema = new Schema<ResumeProject>({
  project: { type: String },
  date: { type: String },
  descriptions: [{ type: String }],
});

const featuredSkillSchema = new Schema<FeaturedSkill>({
  skill: { type: String },
  rating: { type: Number },
});

const resumeSkillsSchema = new Schema<ResumeSkills>({
  featuredSkills: [featuredSkillSchema],
  descriptions: [{ type: String }],
});

const resumeCustomSchema = new Schema<ResumeCustom>({
  descriptions: [{ type: String }],
});

const resumeSchema = new Schema({
  // userId: {},
  resumeFileName: { type: String },
  updatedAt: { type: Date },
  profile: { type: resumeProfileSchema },
  workExperiences: [resumeWorkExperienceSchema],
  educations: [resumeEducationSchema],
  projects: [resumeProjectSchema],
  skills: { type: resumeSkillsSchema },
  custom: { type: resumeCustomSchema },
});

const ResumeModel = mongoose.model("Resume", resumeSchema);

export default ResumeModel;
