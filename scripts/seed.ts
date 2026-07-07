import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const workspace = await db.workspace.upsert({
    where: { slug: 'demo-workspace' },
    update: {},
    create: {
      name: "Sarah's Workspace",
      slug: 'demo-workspace',
      plan: 'PRO',
      hoursLimit: 100,
      hoursUsed: 63,
    },
  });

  console.log('✅ Workspace created:', workspace.name);

  const accounts = [
    { name: 'Acme Corp',    arr: 86000, sentiment: 71, stage: 'ONBOARDING', riskLevel: 'MEDIUM' },
    { name: 'TechFlow Inc.',arr: 48000, sentiment: 45, stage: 'AT_RISK',    riskLevel: 'HIGH' },
    { name: 'Nexus AI',     arr: 36000, sentiment: 68, stage: 'RENEWAL',    riskLevel: 'MEDIUM' },
    { name: 'GlobalTech',   arr: 0,     sentiment: 89, stage: 'DISCOVERY',  riskLevel: 'LOW' },
    { name: 'Zenith Labs',  arr: 24000, sentiment: 92, stage: 'HEALTHY',    riskLevel: 'LOW' },
  ];

  for (const acc of accounts) {
    await db.cRMAccount.upsert({
      where: { id: acc.name.toLowerCase().replace(/\s/g, '-') },
      update: {},
      create: {
        id: acc.name.toLowerCase().replace(/\s/g, '-'),
        name: acc.name,
        arr: acc.arr,
        sentiment: acc.sentiment,
        stage: acc.stage as any,
        riskLevel: acc.riskLevel as any,
        workspaceId: workspace.id,
      },
    });
  }

  console.log('✅ CRM accounts seeded');
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());