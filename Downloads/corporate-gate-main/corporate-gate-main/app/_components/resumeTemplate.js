// resumeTemplates.js - Contains all template rendering functions

export function renderResumeHTML(data, templateId = 'modern') {
  const templates = {
    modern: renderModernTemplate,
    executive: renderExecutiveTemplate,
    creative: renderCreativeTemplate,
    minimal: renderMinimalTemplate,
    tech: renderTechTemplate,
    academic: renderAcademicTemplate,
  };

  const templateFunction = templates[templateId] || templates.modern;
  return templateFunction(data);
}

// Helper function to escape HTML
const esc = (v) => (v == null ? "" : String(v));
const hasContent = (arr) => arr && Array.isArray(arr) && arr.length > 0;
const hasObjectContent = (obj) => obj && Object.keys(obj).some(key => obj[key]);

// 1. MODERN TEMPLATE - Clean, contemporary with sidebar
function renderModernTemplate(data) {
  const { personal, summary, objective, experience, education, projects, skills, certifications, awards, languages, interests } = data;

  return `
    <div style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: #1a1a1a; max-width: 900px; margin: 0 auto; display: flex; background: white; min-height: 100vh;">
      
      <!-- Left Sidebar -->
      <div style="width: 35%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px;">
        ${personal.profileImage ? `
          <img src="${esc(personal.profileImage)}" alt="${esc(personal.fullName)}" 
               style="width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 20px; display: block; border: 4px solid rgba(255,255,255,0.3);">
        ` : ''}
        
        <h1 style="font-size: 28px; margin: 0 0 10px; font-weight: 700;">${esc(personal.fullName)}</h1>
        <p style="font-size: 16px; margin-bottom: 30px; opacity: 0.95;">${esc(personal.title)}</p>
        
        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 8px;">Contact</h3>
          ${personal.email ? `<p style="margin: 8px 0; font-size: 14px;">📧 ${esc(personal.email)}</p>` : ''}
          ${personal.phone ? `<p style="margin: 8px 0; font-size: 14px;">📞 ${esc(personal.phone)}</p>` : ''}
          ${personal.location ? `<p style="margin: 8px 0; font-size: 14px;">📍 ${esc(personal.location)}</p>` : ''}
          ${personal.website ? `<p style="margin: 8px 0; font-size: 14px;">🌐 ${esc(personal.website)}</p>` : ''}
          ${personal.linkedin ? `<p style="margin: 8px 0; font-size: 14px;">💼 ${esc(personal.linkedin)}</p>` : ''}
          ${personal.github ? `<p style="margin: 8px 0; font-size: 14px;">💻 ${esc(personal.github)}</p>` : ''}
        </div>
        
        ${skills?.categories && skills.categories.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 8px;">Skills</h3>
            ${skills.categories.map(cat => `
              <div style="margin-bottom: 15px;">
                <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: rgba(255,255,255,0.95);">${esc(cat.name)}</h4>
                ${(cat.items || []).map(item => `
                  <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 15px; margin: 3px; font-size: 12px;">
                    ${esc(item)}
                  </span>
                `).join('')}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${hasContent(languages) ? `
          <div style="margin-bottom: 30px;">
            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 8px;">Languages</h3>
            ${languages.map(lang => `
              <p style="margin: 8px 0; font-size: 14px;">
                ${esc(lang.language)} ${lang.proficiency ? `- ${esc(lang.proficiency)}` : ''}
              </p>
            `).join('')}
          </div>
        ` : ''}
      </div>
      
      <!-- Right Content -->
      <div style="width: 65%; padding: 40px;">
        ${summary || objective ? `
          <div style="margin-bottom: 35px;">
            <p style="font-size: 15px; line-height: 1.8; color: #555;">
              ${esc(summary || objective)}
            </p>
          </div>
        ` : ''}
        
        ${hasContent(experience) ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 20px; font-weight: 700; color: #667eea; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Experience</h2>
            ${experience.map(exp => `
              <div style="margin-bottom: 25px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <h3 style="font-size: 18px; font-weight: 600; margin: 0; color: #2d3748;">${esc(exp.company)}</h3>
                  <span style="font-size: 13px; color: #718096;">${esc(exp.startDate)} - ${esc(exp.endDate)}</span>
                </div>
                <p style="font-size: 15px; color: #667eea; margin: 5px 0;">${esc(exp.role)}</p>
                ${hasContent(exp.highlights) ? `
                  <ul style="margin-top: 10px; padding-left: 20px;">
                    ${exp.highlights.map(h => `<li style="margin-bottom: 5px; color: #4a5568; font-size: 14px;">${esc(h)}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${hasContent(education) ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 20px; font-weight: 700; color: #667eea; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Education</h2>
            ${education.map(ed => `
              <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between;">
                  <h3 style="font-size: 18px; font-weight: 600; margin: 0; color: #2d3748;">${esc(ed.institution)}</h3>
                  <span style="font-size: 13px; color: #718096;">${esc(ed.graduation || '')}</span>
                </div>
                <p style="font-size: 15px; color: #4a5568; margin: 5px 0;">${esc(ed.degree)}</p>
                ${ed.gpa ? `<p style="font-size: 14px; color: #718096;">GPA: ${esc(ed.gpa)}</p>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${hasContent(projects) ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 20px; font-weight: 700; color: #667eea; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Projects</h2>
            ${projects.map(p => `
              <div style="margin-bottom: 20px;">
                <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 5px; color: #2d3748;">${esc(p.name)}</h3>
                ${p.description ? `<p style="font-size: 14px; color: #4a5568; margin-bottom: 8px;">${esc(p.description)}</p>` : ''}
                ${hasContent(p.techStack) ? `
                  <p style="font-size: 13px; color: #667eea;"><strong>Tech:</strong> ${esc(p.techStack.join(', '))}</p>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// 2. EXECUTIVE TEMPLATE - Professional and sophisticated
function renderExecutiveTemplate(data) {
  const { personal, summary, experience, education, skills, awards, certifications } = data;

  return `
    <div style="font-family: 'Georgia', 'Times New Roman', serif; color: #2d3748; max-width: 850px; margin: 0 auto; background: white; padding: 60px;">
      
      <!-- Header -->
      <div style="text-align: center; border-bottom: 3px solid #1a202c; padding-bottom: 30px; margin-bottom: 40px;">
        <h1 style="font-size: 42px; font-weight: 300; margin: 0; letter-spacing: 3px; color: #1a202c;">${esc(personal.fullName).toUpperCase()}</h1>
        <p style="font-size: 18px; color: #718096; margin-top: 10px; font-style: italic;">${esc(personal.title)}</p>
        <div style="margin-top: 20px; font-size: 14px; color: #4a5568;">
          ${personal.email ? `${esc(personal.email)}` : ''}
          ${personal.phone ? ` | ${esc(personal.phone)}` : ''}
          ${personal.location ? ` | ${esc(personal.location)}` : ''}
          ${personal.linkedin ? `<br/>${esc(personal.linkedin)}` : ''}
        </div>
      </div>
      
      <!-- Executive Summary -->
      ${summary ? `
        <div style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; font-weight: 300; color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">EXECUTIVE SUMMARY</h2>
          <p style="font-size: 16px; line-height: 1.8; color: #4a5568; text-align: justify;">${esc(summary)}</p>
        </div>
      ` : ''}
      
      <!-- Professional Experience -->
      ${hasContent(experience) ? `
        <div style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; font-weight: 300; color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">PROFESSIONAL EXPERIENCE</h2>
          ${experience.map(exp => `
            <div style="margin-bottom: 30px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <div>
                  <h3 style="font-size: 20px; font-weight: 600; margin: 0; color: #2d3748;">${esc(exp.role)}</h3>
                  <p style="font-size: 16px; color: #718096; margin: 5px 0; font-style: italic;">${esc(exp.company)}, ${esc(exp.location)}</p>
                </div>
                <span style="font-size: 15px; color: #718096; font-style: italic;">${esc(exp.startDate)} - ${esc(exp.endDate)}</span>
              </div>
              ${hasContent(exp.highlights) ? `
                <ul style="margin-top: 12px; padding-left: 25px;">
                  ${exp.highlights.map(h => `
                    <li style="margin-bottom: 8px; color: #4a5568; font-size: 15px; line-height: 1.6;">${esc(h)}</li>
                  `).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      <!-- Education -->
      ${hasContent(education) ? `
        <div style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; font-weight: 300; color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">EDUCATION</h2>
          ${education.map(ed => `
            <div style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 18px; font-weight: 600; margin: 0; color: #2d3748;">${esc(ed.institution)}</h3>
                  <p style="font-size: 16px; color: #4a5568; margin: 5px 0;">${esc(ed.degree)}</p>
                  ${ed.gpa ? `<p style="font-size: 14px; color: #718096;">GPA: ${esc(ed.gpa)}</p>` : ''}
                </div>
                <span style="font-size: 15px; color: #718096; font-style: italic;">${esc(ed.graduation || '')}</span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      <!-- Core Competencies -->
      ${skills?.categories && skills.categories.length > 0 ? `
        <div style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; font-weight: 300; color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">CORE COMPETENCIES</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            ${skills.categories.map(cat => `
              <div>
                <h4 style="font-size: 16px; font-weight: 600; color: #2d3748; margin-bottom: 8px;">${esc(cat.name)}</h4>
                <p style="font-size: 14px; color: #4a5568; line-height: 1.6;">${esc((cat.items || []).join(' • '))}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// 3. CREATIVE TEMPLATE - Bold and visually striking
function renderCreativeTemplate(data) {
  const { personal, summary, experience, education, projects, skills } = data;

  return `
    <div style="font-family: 'Poppins', 'Segoe UI', sans-serif; max-width: 900px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 5px;">
      <div style="background: white;">
        
        <!-- Creative Header -->
        <div style="background: linear-gradient(135deg, #ee7724, #d8363a, #dd3675, #b44593); padding: 50px; text-align: center; color: white; position: relative;">
          ${personal.profileImage ? `
            <img src="${esc(personal.profileImage)}" alt="${esc(personal.fullName)}" 
                 style="width: 120px; height: 120px; border-radius: 15px; margin-bottom: 20px; border: 4px solid white; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          ` : ''}
          <h1 style="font-size: 48px; font-weight: 800; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">${esc(personal.fullName)}</h1>
          <p style="font-size: 22px; margin-top: 10px; font-weight: 300; letter-spacing: 1px; opacity: 0.95;">${esc(personal.title)}</p>
          <div style="margin-top: 20px; font-size: 16px;">
            ${personal.email} | ${personal.phone} | ${personal.location}
          </div>
        </div>
        
        <!-- Creative Content -->
        <div style="padding: 40px;">
          ${summary ? `
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; border-radius: 15px; margin-bottom: 30px; color: white;">
              <h2 style="font-size: 24px; margin-bottom: 10px;">✨ About Me</h2>
              <p style="font-size: 16px; line-height: 1.7;">${esc(summary)}</p>
            </div>
          ` : ''}
          
          ${hasContent(experience) ? `
            <div style="margin-bottom: 35px;">
              <h2 style="font-size: 28px; font-weight: 700; color: #764ba2; margin-bottom: 20px;">💼 Experience</h2>
              ${experience.map(exp => `
                <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #764ba2; margin-bottom: 20px; border-radius: 8px;">
                  <h3 style="font-size: 20px; color: #2d3748; margin: 0;">${esc(exp.role)}</h3>
                  <p style="color: #764ba2; font-weight: 600; margin: 5px 0;">${esc(exp.company)} | ${esc(exp.startDate)} - ${esc(exp.endDate)}</p>
                  ${hasContent(exp.highlights) ? `
                    <ul style="margin-top: 10px; color: #4a5568;">
                      ${exp.highlights.map(h => `<li style="margin-bottom: 5px;">${esc(h)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${hasContent(projects) ? `
            <div style="margin-bottom: 35px;">
              <h2 style="font-size: 28px; font-weight: 700; color: #764ba2; margin-bottom: 20px;">🚀 Projects</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${projects.map(p => `
                  <div style="background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); padding: 20px; border-radius: 12px;">
                    <h3 style="font-size: 18px; color: #2d3748; margin: 0 0 10px;">${esc(p.name)}</h3>
                    <p style="font-size: 14px; color: #4a5568;">${esc(p.description || '')}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// 4. MINIMAL TEMPLATE - Simple and clean
function renderMinimalTemplate(data) {
  const { personal, summary, experience, education, skills } = data;

  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 750px; margin: 0 auto; padding: 60px; background: white;">
      
      <!-- Minimal Header -->
      <div style="border-bottom: 1px solid #e0e0e0; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="font-size: 32px; font-weight: 300; margin: 0; color: #1a1a1a;">${esc(personal.fullName)}</h1>
        <p style="font-size: 16px; color: #666; margin-top: 8px;">${esc(personal.title)}</p>
        <p style="font-size: 14px; color: #888; margin-top: 10px;">
          ${personal.email} • ${personal.phone} • ${personal.location}
        </p>
      </div>
      
      ${summary ? `
        <div style="margin-bottom: 30px;">
          <p style="font-size: 15px; line-height: 1.8; color: #555;">${esc(summary)}</p>
        </div>
      ` : ''}
      
      ${hasContent(experience) ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 18px; font-weight: 400; color: #1a1a1a; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Experience</h2>
          ${experience.map(exp => `
            <div style="margin-bottom: 25px;">
              <div style="margin-bottom: 5px;">
                <span style="font-weight: 500; color: #1a1a1a;">${esc(exp.role)}</span>
                <span style="color: #888; font-size: 14px; float: right;">${esc(exp.startDate)} - ${esc(exp.endDate)}</span>
              </div>
              <div style="font-size: 14px; color: #666; margin-bottom: 8px;">${esc(exp.company)}, ${esc(exp.location)}</div>
              ${hasContent(exp.highlights) ? `
                <ul style="margin: 10px 0 0 20px; padding: 0;">
                  ${exp.highlights.map(h => `<li style="margin-bottom: 5px; font-size: 14px; color: #555;">${esc(h)}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${hasContent(education) ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 18px; font-weight: 400; color: #1a1a1a; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Education</h2>
          ${education.map(ed => `
            <div style="margin-bottom: 15px;">
              <div style="font-weight: 500; color: #1a1a1a;">${esc(ed.degree)}</div>
              <div style="font-size: 14px; color: #666;">${esc(ed.institution)}, ${esc(ed.graduation || '')}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${skills?.categories && skills.categories.length > 0 ? `
        <div>
          <h2 style="font-size: 18px; font-weight: 400; color: #1a1a1a; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Skills</h2>
          ${skills.categories.map(cat => `
            <div style="margin-bottom: 10px;">
              <span style="font-weight: 500; color: #555;">${esc(cat.name)}:</span>
              <span style="color: #666; font-size: 14px;"> ${esc((cat.items || []).join(', '))}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// 5. TECH TEMPLATE - Developer-focused with GitHub integration
function renderTechTemplate(data) {
  const { personal, summary, experience, education, projects, skills } = data;

  return `
    <div style="font-family: 'Monaco', 'Consolas', monospace; background: #1e1e1e; color: #d4d4d4; max-width: 900px; margin: 0 auto; padding: 40px;">
      
      <!-- Terminal-style Header -->
      <div style="background: #2d2d2d; border: 1px solid #3e3e3e; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
        <div style="color: #4ec9b0; font-size: 14px; margin-bottom: 10px;">~/resume/</div>
        <h1 style="color: #4fc1ff; font-size: 36px; margin: 0; font-weight: normal;">
          <span style="color: #ce9178;">&gt;</span> ${esc(personal.fullName)}
        </h1>
        <p style="color: #dcdcaa; font-size: 18px; margin-top: 10px;">${esc(personal.title)}</p>
        <div style="margin-top: 15px; font-size: 14px;">
          <span style="color: #9cdcfe;">const</span> <span style="color: #4fc1ff;">contact</span> = {<br/>
          &nbsp;&nbsp;<span style="color: #9cdcfe;">email:</span> <span style="color: #ce9178;">"${esc(personal.email)}"</span>,<br/>
          &nbsp;&nbsp;<span style="color: #9cdcfe;">phone:</span> <span style="color: #ce9178;">"${esc(personal.phone)}"</span>,<br/>
          &nbsp;&nbsp;<span style="color: #9cdcfe;">github:</span> <span style="color: #ce9178;">"${esc(personal.github)}"</span>,<br/>
          &nbsp;&nbsp;<span style="color: #9cdcfe;">website:</span> <span style="color: #ce9178;">"${esc(personal.website)}"</span><br/>
          };
        </div>
      </div>
      
      ${summary ? `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #4ec9b0; font-size: 20px; margin-bottom: 10px;">
            <span style="color: #608b4e;">/*</span> README.md <span style="color: #608b4e;">*/</span>
          </h2>
          <div style="background: #2d2d2d; padding: 15px; border-left: 3px solid #4ec9b0; color: #d4d4d4;">
            ${esc(summary)}
          </div>
        </div>
      ` : ''}
      
      ${hasContent(projects) ? `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #4ec9b0; font-size: 20px; margin-bottom: 15px;">
            <span style="color: #c586c0;">function</span> getProjects() {
          </h2>
          ${projects.map(p => `
            <div style="background: #2d2d2d; padding: 15px; margin-bottom: 15px; border-radius: 6px;">
              <h3 style="color: #dcdcaa; font-size: 16px; margin: 0;">📦 ${esc(p.name)}</h3>
              <p style="color: #9cdcfe; font-size: 14px; margin: 8px 0;">${esc(p.description || '')}</p>
              ${hasContent(p.techStack) ? `
                <div style="margin-top: 10px;">
                  ${p.techStack.map(tech => `
                    <span style="display: inline-block; background: #007acc; color: white; padding: 3px 8px; border-radius: 4px; margin: 2px; font-size: 12px;">
                      ${esc(tech)}
                    </span>
                  `).join('')}
                </div>
              ` : ''}
              ${p.github || p.link ? `
                <div style="margin-top: 10px; font-size: 13px;">
                  ${p.github ? `<a href="${esc(p.github)}" style="color: #4fc1ff; text-decoration: none; margin-right: 15px;">🔗 GitHub</a>` : ''}
                  ${p.link ? `<a href="${esc(p.link)}" style="color: #4fc1ff; text-decoration: none;">🌐 Live Demo</a>` : ''}
                </div>
              ` : ''}
            </div>
          `).join('')}
          <div style="color: #4ec9b0;">}</div>
        </div>
      ` : ''}
      
      ${hasContent(experience) ? `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #4ec9b0; font-size: 20px; margin-bottom: 15px;">
            <span style="color: #569cd6;">class</span> WorkExperience {
          </h2>
          ${experience.map(exp => `
            <div style="margin-bottom: 20px; padding-left: 20px;">
              <div style="color: #dcdcaa; font-size: 16px;">${esc(exp.role)}</div>
              <div style="color: #9cdcfe; font-size: 14px; margin: 5px 0;">
                <span style="color: #c586c0;">at</span> ${esc(exp.company)} 
                <span style="color: #608b4e;">// ${esc(exp.startDate)} - ${esc(exp.endDate)}</span>
              </div>
              ${hasContent(exp.highlights) ? `
                <ul style="margin-top: 10px; color: #d4d4d4; font-size: 13px;">
                  ${exp.highlights.map(h => `<li style="margin-bottom: 5px;">${esc(h)}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
          <div style="color: #4ec9b0;">}</div>
        </div>
      ` : ''}
      
      ${skills?.categories && skills.categories.length > 0 ? `
        <div>
          <h2 style="color: #4ec9b0; font-size: 20px; margin-bottom: 15px;">
            <span style="color: #9cdcfe;">const</span> techStack = {
          </h2>
          <div style="padding-left: 20px;">
            ${skills.categories.map(cat => `
              <div style="margin-bottom: 10px;">
                <span style="color: #9cdcfe;">"${esc(cat.name)}":</span> 
                <span style="color: #ce9178;">[${(cat.items || []).map(item => `"${esc(item)}"`).join(', ')}]</span>
              </div>
            `).join('')}
          </div>
          <div style="color: #4ec9b0;">};</div>
        </div>
      ` : ''}
    </div>
  `;
}

// 6. ACADEMIC TEMPLATE - For researchers and academics
function renderAcademicTemplate(data) {
  const { personal, summary, experience, education, publications, awards, conferences, skills } = data;

  return `
    <div style="font-family: 'Times New Roman', serif; color: #1a1a1a; max-width: 800px; margin: 0 auto; padding: 40px; background: white; line-height: 1.8;">
      
      <!-- Academic Header -->
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 28px; font-weight: normal; margin: 0; letter-spacing: 1px;">${esc(personal.fullName)}, Ph.D.</h1>
        <p style="font-size: 18px; margin-top: 10px; font-style: italic;">${esc(personal.title)}</p>
        <p style="font-size: 14px; margin-top: 15px; color: #555;">
          ${esc(personal.email)} | ${esc(personal.phone)}<br/>
          ${esc(personal.location)}<br/>
          ${personal.website ? esc(personal.website) : ''}
        </p>
      </div>
      
      ${summary ? `
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 15px;">RESEARCH INTERESTS</h2>
          <p style="font-size: 15px; text-align: justify;">${esc(summary)}</p>
        </div>
      ` : ''}
      
      ${hasContent(education) ? `
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 15px;">EDUCATION</h2>
          ${education.map(ed => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between;">
                <strong>${esc(ed.degree)}</strong>
                <span>${esc(ed.graduation || '')}</span>
              </div>
              <div style="font-style: italic;">${esc(ed.institution)}, ${esc(ed.location)}</div>
              ${ed.gpa ? `<div>GPA: ${esc(ed.gpa)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${hasContent(experience) ? `
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 15px;">ACADEMIC APPOINTMENTS</h2>
          ${experience.map(exp => `
            <div style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between;">
                <strong>${esc(exp.role)}</strong>
                <span>${esc(exp.startDate)} - ${esc(exp.endDate)}</span>
              </div>
              <div style="font-style: italic;">${esc(exp.company)}, ${esc(exp.location)}</div>
              ${hasContent(exp.highlights) ? `
                <ul style="margin-top: 10px; margin-left: 20px;">
                  ${exp.highlights.map(h => `<li style="margin-bottom: 5px; font-size: 14px;">${esc(h)}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${hasContent(publications) ? `
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 15px;">SELECTED PUBLICATIONS</h2>
          <ol style="margin-left: 20px;">
            ${publications.map(pub => `
              <li style="margin-bottom: 12px; font-size: 14px;">
                ${hasContent(pub.authors) ? `${esc(pub.authors.join(', '))}. ` : ''}
                "${esc(pub.title)}." <em>${esc(pub.journal)}</em>, ${esc(pub.date)}.
                ${pub.doi ? `DOI: ${esc(pub.doi)}` : ''}
              </li>
            `).join('')}
          </ol>
        </div>
      ` : ''}
      
      ${hasContent(awards) ? `
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 15px;">HONORS AND AWARDS</h2>
          ${awards.map(award => `
            <div style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <strong>${esc(award.title)}</strong>
                <span>${esc(award.date)}</span>
              </div>
              <div style="font-style: italic; font-size: 14px;">${esc(award.issuer)}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}