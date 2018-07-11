/// <reference types="node" />

export const BASE_URL = process.env.BASE_URL || 'https://192.168.99.100';
export const CLOUDBREAK_USERNAME = process.env.CLOUDBREAK_USERNAME || 'admin@example.com';
export const CLOUDBREAK_PASSWORD = process.env.CLOUDBREAK_PASSWORD || 'cloudbreak';

export const OS_USERNAME = process.env.OS_USERNAME || 'cloudbreak';
export const OS_PASSWORD = process.env.OS_PASSWORD || 'cloudbreak';
export const OS_TENANT_NAME = process.env.OS_TENANT_NAME || 'cloudbreak';
export const OS_AUTH_URL = process.env.OS_AUTH_URL || 'http://openstack.hortonworks.com:1000/v2.0';
export const OS_APIFACING = process.env.OS_APIFACING || 'internal';
export const OS_KEYSTONE = process.env.OS_KEYSTONE || 'v2';

export const AMBARI_USER = process.env.AMBARI_USER || 'admin';
export const AMBARI_PASSWORD = process.env.AMBARI_PASSWORD || 'admin123!@#';

export const SSH_KEY_NAME = process.env.SSH_KEY_NAME || 'demotest';
export const SSH_KEY = process.env.SSH_KEY || 'ssh-rsa AAAAB3';

export const CHROME_BIN = process.env.CHROME_BIN || '/usr/bin/google-chrome';
export const CHROME_DRIVER_BIN = process.env.CHROME_DRIVER_BIN || '../chromedriver';